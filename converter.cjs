// Import necessary modules and libraries
const path = require("path");
const fs = require("fs");
const glob = require("glob");
const cheerio = require("cheerio");
const MarkdownIt = require("markdown-it");
const sep = path.sep;

// Delete the existing "docs/blog" directory if it exists
if (fs.existsSync("docs/blog")) {
  fs.rmSync("docs/blog", { recursive: true });
}

// Function to parse cell content from a notebook
const parseCellContent = (cell) =>
  Array.isArray(cell.source) ? cell.source.join("").trim() : cell.source.trim();

// Batch process all notebooks
for (const nbPath of glob.globSync("docs/notebooks/**/*.ipynb")) {
  // Read the sync and async notebooks
  const nbJson = JSON.parse(fs.readFileSync(nbPath, "utf8"));

  // Extract title and description
  const firstCellContent = parseCellContent(nbJson.cells[0]);
  const md = new MarkdownIt({ html: true });
  const doc = cheerio.load(md.render(firstCellContent));

  // Add frontmatter for the markdown file
  const markdownBlocks = [
    `
---
title: "${doc("h1").text().trim()}"
description: "${doc("#meta-description").text().trim()}"
sidebar: false
prev: false
next: false
lastUpdated: true
isArticle: true
createdAt: "${doc("#meta-created-at").text().trim()}"
tags: "${doc("#meta-tags").text().trim()}"
---
    `.trim(),
  ];

  // Create a playground URL for the async notebook
  const nbPlayUrl = new URL(
    "https://playground.foreverpython.com/lab/index.html"
  );
  nbPlayUrl.searchParams.set("path", nbPath.replace(`docs${sep}notebooks`, ""));

  // Process cells and convert to markdown blocks
  for (const [cellIndex, cell] of nbJson.cells.entries()) {
    if (cell.outputs && cell.outputs.length > 0) {
      throw new Error(
        `Notebook "${nbPath}" has non empty outputs in cell ${cellIndex + 1}`
      );
    }

    if (cell.cell_type === "markdown") {
      let cellContent = parseCellContent(cell);
      if (cellIndex === 0) {
        const splits = cellContent.split("\n");
        const playBlock = `
::: tip 🚀 &nbsp; Launch interactive mode!
Ready to play? [Fire up the playground and test it live!](${nbPlayUrl})
:::
          `;
        splits.splice(1, 0, playBlock);
        cellContent = splits.join("\n");
      }
      markdownBlocks.push(cellContent);
    } else if (cell.cell_type === "code") {
      // Add code block with playground links
      markdownBlocks.push(
        `
::: code-group

${"```py [main.py] (" + btoa(nbPlayUrl.href) + ")"}
${parseCellContent(cell)}
${"```"}

:::
        `.trim()
      );
    } else {
      throw new Error(`Unknown cell type "${cell.cell_type}" in "${nbPath}"`);
    }
  }

  // Write output by changing the root directory to "blog"
  let blogDir = path
    .dirname(nbPath)
    .replace(`docs${sep}notebooks`, `docs${sep}blog`);
  if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir, { recursive: true });
  }

  // Write the blog output to a markdown file
  const outputPath = nbPath
    .replace(`docs${sep}notebooks`, `docs${sep}blog`)
    .replace(/\.ipynb$/, ".md");
  fs.writeFileSync(outputPath, markdownBlocks.join("\n\n").trim(), "utf8");

  // Log success message
  console.log(`Notebook converted: ${nbPath} -> ${outputPath}`);
}

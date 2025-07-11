---
title: Browse Articles
description: Browse through the articles in the Forever Python blog site, organized by date.
prev: false
next: false
sidebar: false
lastUpdated: false
---

<script setup>
import { data as posts } from './blogs.data.js'
import { VPLink } from 'vitepress/theme'
import { computed } from 'vue'

const groupedByDates = computed(() => {
  const dateMap = {}
  posts.forEach(post => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateObj = new Date(post.frontmatter["createdAt"]);
    const readableDate = dateObj.toLocaleDateString(undefined, options);
    if (readableDate in dateMap) {
      dateMap[readableDate].push(post)
    } else {
      dateMap[readableDate] = [post]
    }
  })
  return dateMap
})

const sortedDates = computed(() => {
  return Object.keys(groupedByDates.value).sort((a, b) => {
    return new Date(b) - new Date(a)
  })
})
</script>

<div v-for="(date, index) in sortedDates" :key="date">
    <h3 v-if="index === 0" style="margin-bottom: 18px; margin-left: 16px; margin-top: 8px;">{{ date }}</h3>
    <h3 v-else style="margin-bottom: 18px; margin-left: 16px; margin-top: 40px;">{{ date }}</h3>
    <VPLink v-for="post of groupedByDates[date]" :href="post.url" class="pager-link" style="margin-bottom: 16px" :key="post.url">
        <div class="title" v-html="post.frontmatter.title" style="text-decoration: none;"></div>
        <div class="description" v-html="post.frontmatter.description"></div>
        <div style="margin-top: 12px; display: flex; column-gap: 8px;">
          <Badge type="info" v-for="tag of post.frontmatter.tags.split(',')" :key="tag" style="">
            {{ tag.trim() }}
          </Badge>
        </div>
    </VPLink>
</div>


<style scoped>
.pager-link {
  display: block;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 11px 16px 13px;
  width: 100%;
  height: 100%;
  transition: border-color 0.25s;
  text-decoration: none;
}

.pager-link:hover {
  border-color: var(--vp-c-brand-1);
}

.pager-link .title {
  text-decoration: underline;
}

.pager-link .description {
  margin-top: 8px;
  color: var(--vp-c-text-2);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

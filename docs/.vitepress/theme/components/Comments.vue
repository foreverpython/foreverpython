<script setup lang="ts">
import { useData } from "vitepress";
import { computed } from "vue";

const { title, frontmatter, isDark } = useData();

const elementKey = computed(() => {
  return isDark.value ? `${title.value}-dark` : `${title.value}-light`;
});

</script>

<template>
  <div v-if="frontmatter.isArticle" :key="elementKey" class="giscus" style="margin-top: 64px;">
    <component
      :is="'script'"
      src="https://giscus.app/client.js"
      data-repo="mohankumarelec/sample_repository"
      data-repo-id="R_kgDOPK7CmA"
      data-category="General"
      data-category-id="DIC_kwDOPK7CmM4Cs066"
      data-mapping="pathname"
      data-strict="0"
      data-reactions-enabled="1"
      data-emit-metadata="0"
      data-input-position="top"
      :data-theme="isDark ? 'dark' : 'light'"
      data-lang="en"
    />
  </div>
</template>

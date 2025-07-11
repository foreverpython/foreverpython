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
      data-repo="foreverpython/foreverpython"
      data-repo-id="R_kgDOO_GIhw"
      data-category="General"
      data-category-id="DIC_kwDOO_GIh84Cs1Gq"
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

import { h } from "vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import Comments from "./components/Comments.vue";

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      "doc-after": () => h(Comments),
    });
  },
  enhanceApp({ app, router, siteData }) {},
} satisfies Theme;

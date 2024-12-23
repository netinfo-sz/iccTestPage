<template>
  <Layout>
    <template #doc-after>
      <!-- <div style="margin-top: 24px">
        hello
      </div> -->
    </template>

    <template #not-found>
      <NotFound />
    </template>
  </Layout>
  <Log></Log>
</template>

<script lang="ts" setup>
import DefaultTheme from "vitepress/theme";
import NotFound from "./NotFound.vue";
import { watch, onMounted, nextTick, provide  } from "vue";
import { inBrowser, useData } from "vitepress";
import { setInstance } from './use-fcc'
import Log from './log/index.vue'
import {setLog} from './use-log'
onMounted(() => {
  setTimeout(() => {
    if (typeof globalThis !== 'undefined' && globalThis.FCC) {
      setLog({
        name: '实例化对象'
      })
      setInstance(new globalThis.FCC({
        meeting: true,
        phone: true,
        IM: true,
        monitor: true,
        pointToPointCall: true
      }))
    }
  }, 300)
})

// setInstance(new FCC({
//   meeting: true,
//   phone: true,
//   IM: true,
//   monitor: true,
//   pointToPointCall: true
// }))
// setInstance(new FCC())
const { isDark, page } = useData();

const { Layout } = DefaultTheme;

watch(isDark, (dark) => {
  if (!inBrowser) return;

  const iframe = document
    .querySelector("giscus-widget")
    ?.shadowRoot?.querySelector("iframe");

  iframe?.contentWindow?.postMessage(
    { giscus: { setConfig: { theme: dark ? "dark" : "light" } } },
    "https://giscus.app"
  );
});




const enableTransitions = () =>
  'startViewTransition' in document &&
  window.matchMedia('(prefers-reduced-motion: no-preference)').matches

provide('toggle-appearance', async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value
    return
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    )}px at ${x}px ${y}px)`
  ]
  let documents: any = document
  await documents.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  }).ready

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: 'ease-in',
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`
    }
  )
})
</script>
<style>
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}

.VPSwitchAppearance {
  width: 22px !important;
}

.VPSwitchAppearance .check {
  transform: none !important;
}
</style>
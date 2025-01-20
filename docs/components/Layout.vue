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
  <!-- 滚动条 -->
  <Transition name="fade">
    <div v-show="showBackTop" class="vitepress-backTop-main" title="返回顶部" @click="scrollToTop()">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 5v14m0-14l5 5m-5-5l-5 5"/>
      </svg>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import DefaultTheme from "vitepress/theme";
import NotFound from "./NotFound.vue";
import { ref, watch, onMounted, nextTick, provide, onBeforeUnmount  } from "vue";
import { inBrowser, useData } from "vitepress";
import { setInstance } from './use-fcc'
import Log from './log/index.vue'
import {setLog} from './use-log'
onMounted(() => {
  /* eslint-disable-next-line */
  const env: string = import.meta.env.MODE ?? '';
  console.log('环境', env)
  env === 'development' && setTimeout(() => {
    if (typeof globalThis !== 'undefined' && globalThis.FCC) {
      setLog({
        name: '实例化对象'
      })
     
      setInstance(new globalThis.FCC({
        meeting: true,
        phone: true,
        IM: true,
        monitor: true,
        pointToPointCall: true,
        connect: '/'
      }))
    }
  }, 300)
})
// 是否显示返回顶部
const showBackTop = ref(false);

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
// 节流
function throttle(fn, delay = 100) {
  let lastTime = 0;
  return function () {
    let nowTime = +new Date();
    if (nowTime - lastTime > delay) {
      fn.apply(this, arguments);
      lastTime = nowTime;
    }
  };
}
const onScroll = throttle(
  () => (showBackTop.value = Boolean(window.scrollY > 100))
);

// 监听滚动事件
onMounted(() => window.addEventListener("scroll", onScroll));

// 移除监听事件
onBeforeUnmount(() => window.removeEventListener("scroll", onScroll));
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

.vitepress-backTop-main{
  position: fixed;
  bottom: 60px;
  right: 20px;
  cursor: pointer;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #3eaf7c;
  padding: 10px;
  box-shadow: 2px 2px 10px 4px rgba(0, 0, 0, 0.15);
  transition: all 0.5s;
}
.vitepress-backTop-main svg{
  width: 100%;
  height: 100%;
}
/* 去掉一个 */
.aside-curtain{
  display: none;
}
</style>
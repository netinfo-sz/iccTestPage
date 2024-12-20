<template>
  <div>
    <p>
      <span class="text">点击次数:</span>
      <span>{{ count }}</span>
    </p>
    <button @click="onClick">count++</button>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const count = ref(0)
const onClick = () => {
  count.value++
}
</script>
<style module>
.button {
  color: red;
  font-weight: bold;
}
</style>
<template>
  <div class="message-wrapper">
    <div class="message-from" :style="{ color: props.message.nameColor }">{{ props.message.name }}</div>
    <div class="message-bubble">
      <div class="message-bubble-text">{{ props.message.text }}</div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: ['message'],
  setup(props) {
    return {
      props
    };
  }
});
</script>

<style lang="postcss" scoped>
.message-wrapper {
  @apply py-3 flex flex-col items-start;
}

.message-from {
  @apply text-purple-300 text-sm;
}

.message-bubble {
  @apply bg-gray-700 max-w-2xl w-full px-5 py-3 mt-1 rounded-full;
}
</style>

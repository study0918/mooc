<template>
  <div class="user">
    <span class="avatar" :style="{ backgroundColor: user.color, color: foregroundColor }">{{ acronym }}</span>
    <span class="name">{{ props.user.firstName }} {{ props.user.lastName }}</span>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { shouldUseDarkForeground } from '../utils/colors.js';

export default defineComponent({
  props: ["user"],
  setup(props) {
    const acronym = `${props.user.firstName[0].toUpperCase()}${props.user.lastName[0].toUpperCase()}`;
    const foregroundColor = shouldUseDarkForeground(props.user.color) ? '#000' : '#fff';

    return {
      acronym,
      foregroundColor,
      props
    };
  },
});
</script>

<style lang="postcss" scoped>
.avatar {
  @apply rounded-full h-10 w-10 flex items-center justify-center font-bold md:mr-3;
}

.user {
  @apply flex items-center py-2;
}

.name {
  @apply hidden md:inline-block;
}
</style>

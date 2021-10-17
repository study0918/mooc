<template>
  <nav>
    <slot />
  </nav>
</template>

<style lang="postcss" scoped>
nav {
  @apply md:w-1/4 h-full p-3 bg-gray-900 overflow-y-scroll;
}
</style>

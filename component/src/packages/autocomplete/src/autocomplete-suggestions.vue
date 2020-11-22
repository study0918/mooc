<template>
  <transition name="el-zoom-in-top" @after-leave="doDestroy">
    <div
      v-show="showPopper"
      class="el-autocomplete-suggestion el-popper"
      :class="{ 'is-loading': !parent.hideLoading && parent.loading }"
      :style="{ width: dropdownWidth }"
      role="region"
    ></div>
  </transition>
</template>

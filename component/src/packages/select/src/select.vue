<template>
  <div
    class="el-select"
    :class="[selectSize ? 'el-select--' + selectSize : '']"
  >
    <div
      class="el-select_tags"
      v-if="multiple"
      ref="tags"
      :style="{ 'max-width': inputWidth - 32 + 'px', width: '100%' }"
    >
      <span v-if="collapseTags && selected.length"></span>
    </div>
  </div>
</template>
<script>
export default {
  name: "ElSelect",
  inject: {
    elFormItem: {
      default: ""
    }
  },
  props: {
    size: String,
    multiple: Boolean,
    collapseTags: Boolean
  },
  data() {
    return {
      inputWidth: 0,
      selected: this.multiple ? [] : {}
    };
  },
  computed: {
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },
    selectSize() {
      return this.size || this._elFormItemSize;
    }
  }
};
</script>

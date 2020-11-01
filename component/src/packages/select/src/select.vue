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
      <span>
        <el-tag :closable="!selectDisabled" :size="collapseTagSize" :hit="selected[0].hitState"></el-tag>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: "ElSelect",
  inject: {
    elForm: {
      default: ""
    },
    elFormItem: {
      default: ""
    }
  },
  props: {
    size: String,
    multiple: Boolean,
    collapseTags: Boolean,
    disabled: Boolean
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
    },
    selectDisabled() {
      return this.disabled || (this.elForm || {}).disabled;
    },
    collapseTagSize() {
      return ["small", "mini"].indexOf(this.selectSize) > -1 ? "mini" : "small";
    }
  }
};
</script>
<style lang="scss">
@import "../../theme-chalk/src/select.scss";
</style>

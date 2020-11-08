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
        <el-tag
          :closable="!selectDisabled"
          :size="collapseTagSize"
          :hit="selected[0].hitState"
          type="info"
          @close="deleteTag($event, selected[0])"
          disable-transitions
        >
          <span class="el-select__tags-text">{{
            selected[0].currentLabel
          }}</span>
        </el-tag>
        <el-tag
          v-if="selected.length > 1"
          :closable="false"
          :size="collapseTagSize"
          type="info"
          disable-transitions
        >
          <span class="el-select__tags-text">+{{ selected.length - 1 }}</span>
        </el-tag>
      </span>
      <transition-group @after-leave="resetInputHeight" v-if="!collapseTags">
        <el-tag v-for="item in selected" :key="getValueKey(item)" :closable="!selectDisabled" :size="collapseTagSize" :hit="item.hitState" type="info" @close="deleteTag($event, item)"
          disable-transitions>
          <span class="el-select__tags-text">{{item.currentLabel}}</span>
          </el-tag>
      </transition-group>
      <input type="text" class="el-select__input" :class="[selectSize?`is-${selectSize}`:'']" :disabled="selectDisabled" :autocomplete="autoComplete||autocomplete" @focus="handleFocus"
      @blur="softFocus=false"
      @keyup="managePlaceholder"
      @keydown="resetInputState"
      @keydown.down.prevent="navigateOptions('next')"
      @keydown.up.prevent="navigateOptions('prev')"
      @keydown.enter.prevent="selectOption"
      @keydown.esc.stop.prevent="visible = false"
      @keydown.delete="deletePrevTag"
      @keydown.tab="visible = false"
      @compositionstart="handleComposition"
      @compositionupdate="handleComposition"
      @compositionend="handleComposition"
      v-model="query"
      @input="debouncedQueryChange"
      v-if="filterable"
      :style="{ 'flex-grow': '1', width: inputLength / (inputWidth - 32) + '%', 'max-width': inputWidth - 42 + 'px' }"
      ref="input"></input>
    </div>
  </div>
</template>
<script>
import { getValueByPath } from "../../../utils/util";
import NavigationMixin from './navigation-mixin';
export default {
  mixins: [NavigationMixin],
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
    disabled: Boolean,
    valueKey: {
      type: String,
      default: "value"
    }
  },
  data() {
    return {
      inputWidth: 0,
      selected: this.multiple ? [] : {},
      softFocus: false,
      query:"",
      filterable:""
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
  },
  methods: {
    deleteTag(event, tag) {},
    resetInputHeight() {},
    getValueKey(item) {
      if (
        Object.prototype.toString.call(item.value).toLowerCase() !==
        "[object object]"
      ) {
        return item.value;
      } else {
        return getValueByPath(item.value, this.valueKey);
      }
    },
    handleFocus() {

    },
    managePlaceholder() {},
    resetInputState() {},
    selectOption(){},
    deletePrevTag() {},
    handleComposition() {},
    debouncedQueryChange() {}
  },
  created() {
    console.log("multiple", this.multiple);
  }
};
</script>
<style lang="scss">
@import "../../theme-chalk/src/select.scss";
</style>

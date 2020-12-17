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
    <el-input
      ref="reference"
      v-model="selectedLabel"
      type="text"
      :placeholder="currentPlaceholder"
      :name="name"
      :id="id"
      :autocomplete="autoComplete || autocomplete"
      :size="selectSize"
      :disabled="selectDisabled"
      :readonly="readonly"
      :validate-event="false"
      :class="{ 'is-focus': visible }"
      :tabindex="(multiple && filterable) ? '-1' : null"
      @focus="handleFocus"
      @blur="handleBlur"
      @keyup.native="debouncedOnInputChange"
      @keydown.native.down.stop.prevent="navigateOptions('next')"
      @keydown.native.up.stop.prevent="navigateOptions('prev')"
      @keydown.native.enter.prevent="selectOption"
      @keydown.native.esc.stop.prevent="visible = false"
      @keydown.native.tab="visible = false"
      @paste.native="debouncedOnInputChange"
      @mouseenter.native="inputHovering = true"
      @mouseleave.native="inputHovering = false">
      <template slot="prefix" v-if="$slots.prefix">
        <slot name="prefix"></slot>
      </template>
      <template slot="suffix">
        <i v-show="!showClose" :class="['el-select__caret', 'el-input__icon', 'el-icon-' + iconClass]"></i>
        <i v-if="showClose" class="el-select__caret el-input__icon el-icon-circle-close" @click="handleClearClick"></i>
      </template>
    </el-input>
    <transition
      name="el-zoom-in-top"
      @before-enter="handleMenuEnter"
      @after-leave="doDestroy">
      <el-select-menu
        ref="popper"
        :append-to-body="popperAppendToBody"
        v-show="visible && emptyText !== false">
        <el-scrollbar
          tag="ul"
          wrap-class="el-select-dropdown__wrap"
          view-class="el-select-dropdown__list"
          ref="scrollbar"
          :class="{ 'is-empty': !allowCreate && query && filteredOptionsCount === 0 }"
          v-show="options.length > 0 && !loading">
          <el-option
            :value="query"
            created
            v-if="showNewOption">
          </el-option>
          <slot></slot>
        </el-scrollbar>
        <template v-if="emptyText && (!allowCreate || loading || (allowCreate && options.length === 0 ))">
          <slot name="empty" v-if="$slots.empty"></slot>
          <p class="el-select-dropdown__empty" v-else>
            {{ emptyText }}
          </p>
        </template>
      </el-select-menu>
    </transition>
  </div>
</template>
<script>
import Emitter from '../../../mixins/emitter'
import Focus from '../../../mixins/focus'
import Locale from '../../../mixins/locale'
import ElInput from '../../../packages/input'
import ElSelectMenu from './select-dropdown.vue';
import ElOption from './option.vue';
import ElTag from '../../../packages/tag'
import ElScrollbar from '../../../packages/scrollbar'
import debounce from 'throttle-debounce/debounce';
import Clickoutside from '../../../utils/clickoutside';
import { addResizeListener, removeResizeListener } from '../../../utils/resize-event';
import {t} from '../../../locale'
import { getValueByPath, valueEquals, isIE, isEdge } from "../../../utils/util";
import NavigationMixin from './navigation-mixin';
import { isKorean } from '../../../utils/shared';
export default {
  mixins: [Emitter, Locale, Focus('reference'), NavigationMixin],
  name: "ElSelect",
  componentName: 'ElSelect',
  inject: {
    elForm: {
      default: ""
    },
    elFormItem: {
      default: ""
    }
  },
  provide() {
    return {
      'select': this
    };
  },
  computed: {
    _elFormItemSize() {
      return (this.elFormItem || {}).elFormItemSize;
    },
    readonly() {
      return !this.filterable || this.multiple || (!isIE() && !isEdge() && !this.visible);
    },
    showClose() {
      let hasValue = this.multiple
        ? Array.isArray(this.value) && this.value.length > 0
        : this.value !== undefined && this.value !== null && this.value !== '';
      let criteria = this.clearable &&
        !this.selectDisabled &&
        this.inputHovering &&
        hasValue;
      return criteria;
    },
    iconClass() {
      return this.remote && this.filterable ? '' : (this.visible ? 'arrow-up is-reverse' : 'arrow-up');
    },

    debounce() {
      return this.remote ? 300 : 0;
    },
    emptyText() {
      if (this.loading) {
        return this.loadingText || this.t('el.select.loading');
      } else {
        if (this.remote && this.query === '' && this.options.length === 0) return false;
        if (this.filterable && this.query && this.options.length > 0 && this.filteredOptionsCount === 0) {
          return this.noMatchText || this.t('el.select.noMatch');
        }
        if (this.options.length === 0) {
          return this.noDataText || this.t('el.select.noData');
        }
      }
      return null;
    },
    showNewOption() {
      let hasExistingOption = this.options.filter(option => !option.created)
        .some(option => option.currentLabel === this.query);
      return this.filterable && this.allowCreate && this.query !== '' && !hasExistingOption;
    },

    selectSize() {
      return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
    },

    selectDisabled() {
      return this.disabled || (this.elForm || {}).disabled;
    },

    collapseTagSize() {
      return ['small', 'mini'].indexOf(this.selectSize) > -1
        ? 'mini'
        : 'small';
    }
  },
  components: {
    ElInput,
    ElSelectMenu,
    ElOption,
    ElTag,
    ElScrollbar
  },

  directives: { Clickoutside },
  props: {
    name: String,
    id: String,
    value: {
      required: true
    },
    autocomplete: {
      type: String,
      default: 'off'
    },
    /** @Deprecated in next major version */
    autoComplete: {
      type: String,
      validator(val) {
        process.env.NODE_ENV !== 'production' &&
          console.warn('[Element Warn][Select]\'auto-complete\' property will be deprecated in next major version. please use \'autocomplete\' instead.');
        return true;
      }
    },
    automaticDropdown: Boolean,
    size: String,
    disabled: Boolean,
    clearable: Boolean,
    filterable: Boolean,
    allowCreate: Boolean,
    loading: Boolean,
    popperClass: String,
    remote: Boolean,
    loadingText: String,
    noMatchText: String,
    noDataText: String,
    remoteMethod: Function,
    filterMethod: Function,
    multiple: Boolean,
    multipleLimit: {
      type: Number,
      default: 0
    },
    placeholder: {
      type: String,
      default() {
        return t('el.select.placeholder');
      }
    },
    defaultFirstOption: Boolean,
    reserveKeyword: Boolean,
    valueKey: {
      type: String,
      default: 'value'
    },
    collapseTags: Boolean,
    popperAppendToBody: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      options: [],
      cachedOptions: [],
      createdLabel: null,
      createdSelected: false,
      selected: this.multiple ? [] : {},
      inputLength: 20,
      inputWidth: 0,
      initialInputHeight: 0,
      cachedPlaceHolder: '',
      optionsCount: 0,
      filteredOptionsCount: 0,
      visible: false,
      softFocus: false,
      selectedLabel: '',
      hoverIndex: -1,
      query: '',
      previousQuery: null,
      inputHovering: false,
      currentPlaceholder: '',
      menuVisibleOnFocus: false,
      isOnComposition: false,
      isSilentBlur: false
    };
  },
  watch:{
    selectDisabled() {
      this.$nextTick(() => {
        this.resetInputHeight();
      });
    },
    placeholder(val) {
      this.cachedPlaceHolder = this.currentPlaceholder = val;
    },
    value(val,oldVal) {
      if (this.multiple) {
        this.resetInputHeight();
        if ((val && val.length > 0) || (this.$refs.input && this.query !== '')) {
          this.currentPlaceholder = '';
        } else {
          this.currentPlaceholder = this.cachedPlaceHolder;
        }
        if (this.filterable && !this.reserveKeyword) {
          this.query = '';
          this.handleQueryChange(this.query);
        }
      }
      this.setSelected();
      if (this.filterable && !this.multiple) {
        this.inputLength = 20;
      }
      if (!valueEquals(val, oldVal)) {
        this.dispatch('ElFormItem', 'el.form.change', val);
      }
    },
    options() {
      if (this.$isServer) return;
      this.$nextTick(() => {
        this.broadcast('ElSelectDropdown', 'updatePopper');
      });
      if (this.multiple) {
        this.resetInputHeight();
      }
      let inputs = this.$el.querySelectorAll('input');
      if ([].indexOf.call(inputs, document.activeElement) === -1) {
        this.setSelected();
      }
      if (this.defaultFirstOption && (this.filterable || this.remote) && this.filteredOptionsCount) {
        this.checkDefaultFirstOption();
      }
    }
  },
  methods: {
    handleComposition(event) {
      const text = event.target.value;
      if (event.type === 'compositionend') {
        this.isOnComposition = false;
        this.$nextTick(_ => this.handleQueryChange(text));
      } else {
        const lastCharacter = text[text.length - 1] || '';
        this.isOnComposition = !isKorean(lastCharacter);
      }
    },
    handleQueryChange(val) {
      
    },
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

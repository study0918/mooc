<template>
<div :class="[
  type === 'textarea' ? 'el-textarea' : 'el-input',
  inputSize ? 'el-input--' + inputSize : '',
  {
    'is-disabled': inputDisabled,
    'is-exceed': inputExceed,
    'el-input-group': $slots.prepend || $slots.append,
    'el-input-group--append': $slots.append,
    'el-input-group--prepend': $slots.prepend,
    'el-input--prefix': $slots.prefix || prefixIcon,
    'el-input--suffix': $slots.suffix || suffixIcon || clearable || showPassword
  }
  ]"
  @mouseenter="hovering = true"
  @mouseleave="hovering = false"
  ></div>
</template>
<script>
export default {
  name: 'ElInput',
  componentName: 'ElInput',
  inject:{
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },
  data() {
    return {
      textareaCalcStyle:{},
      hovering:false,
      focused:false,
      isComposing:false,
      passwordVisible:false
    }
  },
  props:{
    value:[String,Number],
    size:String,
    form:String,
    disabled:Boolean,
    readonly:Boolean,
    type:{
      type:String,
      default:"text"
    },
    autoSize:{
      type: [Boolean, Object],
      default: false
    }，
    autocomplete:{
      type:String,
      default:"off"
    },
    autoComplete: {
      type: String,
      validator(val) {
        process.env.NODE_ENV !== 'production' &&
          console.warn('[Element Warn][Input]\'auto-complete\' property will be deprecated in next major version. please use \'autocomplete\' instead.');
        return true;
      }
    },
    validateEvent:{
      type:Boolean,
      default:true
    },
    suffixIcon: String,
    prefixIcon: String,
    label: String,
    clearable:{
      type:Boolean,
      default:false
    },
    showPassword:{
      type: Boolean,
      default: false
    },
    tabindex: String
  }
}
</script>
<style lang="scss">
@import "../../theme-chalk/src/input.scss";
</style>

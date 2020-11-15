<template>
  <div>
    {{ $attrs }} --- {{ $listeners }}
  </div>
</template>
<script>
export default {
  props: ['weight'],
  created() {
    console.log('grandSon',this.$attrs) // age, infoObj, height
    console.log('grandSon',this.$listeners) // updateInfo: f, delInfo: f, addInfo: f
    this.$emit('updateInfo') // 可以触发 father 组件中的updateInfo函数
  },
}
</script>
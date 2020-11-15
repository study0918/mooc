<template>
  <grand-son :height="height" :weight="weight" @addInfo="addInfo" v-bind="$attrs" v-on="$listeners" />
</template>
<script>
// 通过 $listeners 将父作用域中的事件，传入 grandSon 组件，使其可以获取到 father 中的事件
import GrandSon from './grandSon.vue'
export default {
  name: 'child',
  components: { GrandSon },
  props: ['name'],
  data() {
    return {
      height: '180cm',
      weight: '70kg',
    }
  },
  created() {
    console.log('child',this.$attrs) // 结果：age, infoObj, 因为父组件共传来name, age, infoObj三个值，由于name被 props接收了，所以只有age, infoObj属性
    console.log('child',this.$listeners) // updateInfo: f, delInfo: f
  },
  methods: {
    addInfo() {
      console.log('add info')
    },
  },
}
</script>
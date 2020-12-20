<template>
  <div id="child">
    <son v-bind="$attrs" v-on="$listeners"></son>
  </div>
</template>
<script>
import Son from "./son";
export default {
  inheritAttrs: false,
  components: { Son },
  // props: { prop },
  data() {
    return {};
  },
  methods: {},
  mounted() {
    // 结果显示$attr.temp 不包含prop
    console.log(this.$attrs);
    console.log(this.$listeners);
    this.$emit("tempFn");
  }
};
</script>

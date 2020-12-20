<template>
  <div id="son">
    {{ $attrs.temp }}
  </div>
</template>
<script>
export default {
  prop: {},
  data() {
    return {};
  },
  mounted() {
    this.$emit("tempFn");
  },
  methods: {}
};
</script>

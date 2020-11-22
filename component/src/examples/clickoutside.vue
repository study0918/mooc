<template>
  <div v-clickoutside="handleClickOutside">内部</div>
</template>
<script>
import Clickoutside from "../utils/clickoutside";
export default {
  directives: { Clickoutside },
  methods: {
    handleClickOutside() {
      console.log("triggered");
    }
  }
};
</script>
<style>
div {
  height: 200px;
  width: 200px;
  border: 1px solid red;
}
</style>

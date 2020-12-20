<template>
  <div id="father">
    <child :temp="tempdata" @tempFn="fatherFn" :prop="prop"></child>
  </div>
</template>
<script>
// https://www.cnblogs.com/lsboom/p/11365293.html
import Child from "./child";
export default {
  components: { Child },
  data() {
    return {
      tempdata: "i am father",
      prop: "i am props"
    };
  },
  methods: {
    fatherFn: function() {
      console.log("father function!");
    }
  }
};
</script>

<template>
  <div id="father">
    <child :temp="tempdata" @tempFn="fatherFn" :prop="prop"></child>
  </div>
</template>
<script>
// https://www.cnblogs.com/lsboom/p/11365293.html
// https://github.com/lgwebdream/FE-Interview/issues/37
// https://blog.csdn.net/qq_37860963/article/details/81539118
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

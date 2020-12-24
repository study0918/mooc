<template>
  <div class="child">
    <el-button @click="submit">子iframe</el-button>
    <p>{{ data }}</p>
    <p>{{ origin }}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: "",
      origin: ""
    };
  },
  methods: {
    submit() {
      let type = "background";
      let targetOrigin = "*";
      window.parent.postMessage(type, targetOrigin);
    },
    receiveMsg() {
      window.addEventListener(
        "message",
        function(event) {
          // 通过origin属性判断消息来源地址
          // if (event.origin == 'localhost') {
          console.log(event);
          // this.data = event.data;
          // this.origin = event.origin;
          //console.log(event.source);
          //}
        },
        false
      );
    }
  },
  mounted() {
    this.receiveMsg();
  }
};
</script>
<style lang="scss" scoped>
.child {
  width: 500px;
  height: 150px;
  border: 1px solid green;
}
</style>

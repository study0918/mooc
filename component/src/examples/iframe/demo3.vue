<template>
  <div>
    <div class="parent">
      <el-button @click="btn()">
        打开iframe
      </el-button>
      <el-button @click="sendMsg()">发送消息</el-button>
    </div>
    <iframe-tab :src="src"></iframe-tab>
  </div>
</template>

<script>
import iframeTab from "./iframe.vue";
export default {
  name: "show",
  data() {
    return {
      src: ""
    };
  },
  components: {
    iframeTab
  },
  created() {},
  methods: {
    btn() {
      this.src = "http://localhost:8080/#/childIframe";
    },
    sendMsg() {
      var iframe = document.getElementById("color");
      var targetOrigin = "http://localhost:8080/#/childIframe";
      var dite = "qwe";
      iframe.contentWindow.postMessage(dite, targetOrigin);
    },
    receiveMsg() {
      window.addEventListener(
        "message",
        function(event) {
          console.log(event);
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
.parent {
  width: 500px;
  height: 50px;
  border: 1px solid red;
}
</style>

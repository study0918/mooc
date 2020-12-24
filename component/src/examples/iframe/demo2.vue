<template>
  <div>
    <iframe
      id="template-iframe"
      ref="iframe"
      :src="src"
      @load="loaded"
    ></iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      iframeWin: {}
    };
  },
  computed: {
    src() {
      if (process.env.BASE_SYSTEM === "devops_dev") {
        return "http://0.0.0.0:8888/alerts_confirm";
      }
      return "https://alert.ainnovation.com/alerts_confirm";
    }
  },
  methods: {
    loaded() {
      const cookie = document.cookie;
      this.iframeWin.postMessage(cookie, this.src);
    }
  },
  mounted() {
    this.iframeWin = this.$refs.iframe.contentWindow;
  }
};
</script>

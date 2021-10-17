<template>
  <div class="about">
    <div id="viewer"/>
    <button @click="whatContent">console.log(content)</button>
  </div>
</template>
<script>
  import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer';
  import '@toast-ui/editor/dist/toastui-editor-viewer.css'; // Viewer's Style
  import 'highlight.js/styles/github.css'; // code block highlight 스타일
  import codeSyntaxHightlight from '@toast-ui/editor-plugin-code-syntax-highlight';
  import hljs from 'highlight.js';
  export default {
    name: "About",
    data() {
      return {
        content: null
      }
    },
    props: {
      params: Object
    },
    methods: {
      getContent() {
        const { content } = this.$router.currentRoute.params
        return content
      },
      whatContent() {
        console.log(this.content)
      }
    },
    mounted() {
      const viewer = new Viewer({
        el: document.querySelector("#viewer"),
        initialValue: this.getContent(),
        plugins: [[codeSyntaxHightlight, { hljs }]]
      })
      console.log(viewer)
      this.content = this.getContent()
    }
  }
</script>

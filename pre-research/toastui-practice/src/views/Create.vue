<template>
  <div class="home">
    <Editor @onSubmit="submitContent"/>
  </div>
</template>

<script>
import Editor from '@/components/Editor.vue'

export default {
  name: 'Create',
  components: {
    Editor
  },
  methods: {
    submitContent(content) {
      this.$router.push({name: "ToastViewer", params: {content: content}})
    }
  }
}
</script>

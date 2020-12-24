<template>
  <div class="iframe">
    <iframe id="color" :src="src" frameborder="0"></iframe>
  </div>
</template>
<style scoped></style>
<script>
export default {
  computed: {},
  props: ["src"],
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.iframe {
  width: 500px;
  height: 150px;
  border: 1px solid green;
  iframe {
    width: 100%;
  }
}
</style>

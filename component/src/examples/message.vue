<template>
  <div>
    <button onClick="showMessage">提示</button>
  </div>
</template>
<script>
export default {
  methods:{
    showMessage() {
      this.$message()
    }
  }
}
</script>

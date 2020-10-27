<template>
  <div>
    <button onClick="showMessage">提示</button>
    <el-select></el-select>
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

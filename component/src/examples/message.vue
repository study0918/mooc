<template>
  <div>
    <button onClick="showMessage">提示</button>
    <el-select multiple></el-select>
    <!-- <el-tag>标签一</el-tag> -->
  </div>
</template>
<script>
export default {
  methods: {
    showMessage() {
      this.$message();
    }
  }
};
</script>

<template>
  <div>
    basic:
    <el-input
      v-model="input"
      placeholder="请输入内容"
      style="width:400px"
    ></el-input>
    <hr />
    clearable:
    <el-input placeholder="请输入内容" v-model="input" style="width:400px" clearable> </el-input>
  </div>
</template>
<script>
export default {
  data() {
    return {
      input: ""
    };
  }
};
</script>

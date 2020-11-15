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
    <hr />
    show-password:
    <el-input placeholder="请输入密码" v-model="input" show-password style="width:400px"></el-input>
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

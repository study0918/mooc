<template>
  <div>
    <el-input
      v-model="input"
      placeholder="请输入内容"
      style="width:400px"
    ></el-input>
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

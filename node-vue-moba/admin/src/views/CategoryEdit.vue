<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}管理员</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data(){
    return {
      model: {},
      
    }
  },
  methods: {
    async save(){
      const res = await this.$http.post('/categories', this.model)
      console.log('res',res)
      this.$router.push('/categories/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async fetch(){
      
    },
  },
  created(){
    this.id && this.fetch()
  }
}
</script>

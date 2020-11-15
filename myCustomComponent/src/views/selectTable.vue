<template>
  <div>
    <tree-table :data="coursewareList" :columns="columns" :primary_fld="'id'" :expand-all="expandAll" :parent_fld="'parent_id'" :select_fld="'false'" @replayStudy="replayStudy">
      <el-table-column label="课件进度" min-width="150" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.progress}}</span>
        </template>
      </el-table-column>
    </tree-table>
  </div>
</template>
<script>
export default {
  name: 'courseProgress',
  data() {
    return {
      expandAll: true,
      columns: [{ value: 'itemName', text: '章节', minWidth: '300' }],
      coursewareList: [
        {
          id: '1',
          parent_id: '',
          itemName: '第一章',
          progress: '86%',
          comment: '',
          type: 'chapter',
        },
        {
          id: '2',
          parent_id: '',
          itemName: '第二章',
          progress: '86%',
          type: 'chapter',
        },
        {
          id: '3',
          parent_id: '1',
          itemName: '第1节',
          progress: '86%',
          type: 'node',
        },
        {
          id: '4',
          parent_id: '2',
          itemName: '第2节',
          progress: '86%',
          type: 'node',
        },
        {
          id: '5',
          parent_id: '1',
          itemName: '第2节',
          progress: '100%',
          type: 'node',
        },
        {
          id: '9',
          parent_id: '3',
          itemName: '第1考点',
          progress: '100%',
          type: 'point',
        },
        {
          id: '10',
          parent_id: '3',
          itemName: '第2考点',
          progress: '100%',
          type: 'point',
        },
        {
          id: '11',
          parent_id: '5',
          itemName: '第一考点',
          progress: '100%',
          type: 'point',
        },
        {
          id: '12',
          parent_id: '4',
          itemName: '第一考点',
          progress: '100%',
          type: 'point',
        },
        {
          id: '9',
          parent_id: '',
          itemName: '综合学习',
          progress: '100%',
          type: 'point',
        },
      ],
    }
  },
  methods: {
    replayStudy() {},
  },
}
</script>
<style scoped>
</style>
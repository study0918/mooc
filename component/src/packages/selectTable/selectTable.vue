<template>
  <div>
    <el-table :data="formatData" :row-style="showRow" v-bind="$attrs" v-on="$listeners">,
      <template v-if="select_fld">
        <el-table-column width="50" align="center">,
          <template slot="header" slot-scope="scope">
            <el-checkbox v-model="chooseall" @change="setchildtobeselect(formatData,$event)" />
          </template>
          <template slot-scope="scope">
            <el-checkbox v-model="scope.row[select_fld]" @change="toselect(scope.row)"></el-checkbox>
          </template>
        </el-table-column>
      </template>

      <el-table-column v-if="columns.length===0">
        <template slot-scope="scope">
          <span v-for="space in scope.row._level" :key="space" class="ms-tree-space"></span>
          <span v-if="iconShow(0,scope)" class="tree-ctrl" @click="toggleExpanded(scope.$index)">
            <i v-if="!scope.row._expanded" class="el-icon-plus"></i>
            <i v-else class="el-icon-minus"></i></span>
          {{ scope.$index }}
        </template>
      </el-table-column>
      <!--自定义树节点显示的列值-->
      <el-table-column v-for="(column, index) in columns" v-else :key="column.value" :label="column.text" :width="column.width" :min-width="column.minWidth">
        <template slot-scope="scope">
          <!-- Todo -->
          <span v-for="space in scope.row._level" v-if="index === 0" :key="space" class="ms-tree-space"></span>
          <el-button size="mini" style="color: #17CAAA" v-if="scope.row.type === 'point'">替学</el-button>
          <span v-if="iconShow(index,scope)" class="tree-ctrl" @click="toggleExpanded(scope.$index)">
            <i v-if="!scope.row._expanded" class="el-icon-caret-right"></i>
            <i v-else class="el-icon-caret-bottom"></i></span>
          {{ scope.row[column.value] }}
        </template>
      </el-table-column>
      <slot />
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'treeTable',
  data() {
    return {
      // chooseson:true, //全选
      key: true, // 单个点击直到全部选中
      // 挡前全选状态
      chooseall: false,
    }
  },
  props: {
    /**eslint-disable */
    data: {
      type: [Array, Object],
      required: true,
    },
    columns: {
      type: Array,
      default: () => [],
    },
    evalFunc: Function,
    evalArgs: Array,
    expandAll: {
      type: Boolean,
      default: false,
    },
    select_fld: {
      type: String,
      default: '',
    },
    // 如果数据源是靠字父级字段来表示树的话，primary_fld和parent_fld必须同时传入，并指定root_value
    primary_fld: {
      type: String,
      default: 'id',
      required: true,
    },
    parent_fld: {
      type: String,
      default: '',
    },
    // 根级节点值
    root_value: {
      type: [String, Number],
      default: '',
    },
    // 可选，子节点数的字段，如果含有此字段，将会加快加载速度
    child_count_fld: {
      type: String,
      default: '',
    },
  },
  computed: {
    formatData: function () {
      let result = []
      let tmp
      let func = this.evalFunc
      if (this.is_source_table) {
        // 数据源是一个表格数组，依靠关键字段和父级id组成关系
        tmp = 0
        func = this.tableToTree
      } else if (Array.isArray(this.data)) {
        tmp = this.data
      } else {
        tmp = [this.data]
      }
      const args = this.evalArgs ? [result, tmp, this.expandAll].concat(this.evalArgs) : [result, tmp, this.expandAll]
      func.apply(null, args)
      result
    },
    // 判断数据源是否使用父级字段来表示的二维的表格树
    is_source_table: function () {
      return this.primary_fld && this.parent_fld
    },
  },
  methods: {
    // 代替原来的treeToArray函数
    tableToTree: function (tResult, tStartRecno, expandAll, parent, level, item) {
      const that = this
      let parent_value = that.root_value
      let _level = 1
      let record = null
      let child = null
      const marLTemp = []
      let tmp = []
      debugger
      if (parent) {
        parent_value = parent[that.primary_fld]
        _level = level
      }

      //Array.from(data).forEach(function(record) {
      for (let i = tStartRecno, count = that.data.length; i < count; i++) {
        record = that.data[i]
        // parent_fld = parent_id
        //root_value=parent_value=''
        if(record[that.parent_fld] !== parent_value) {
          continue
        }
        if(record._expanded ===undefined) {
          this.$set(record,'_expanded',expandAll)
        }
      }
    },
    setchildtobeselect() {},
    showRow: function (row) {
      const show = row.row.parent ? row.row.parent._expanded && row.row.parent._show : true
      row.row._show = show
      return show ? 'animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;' : 'display:none;'
    },
  },
  mounted() {
    this.$nextTick(() => {
      var that = this
      //const all = document.getElementById("chooseall");
    })
  },
}
</script>

<style scoped>
@keyframes treeTableShow {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@-webkit-keyframes treeTableShow {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.ms-tree-space {
  position: relative;
  top: 1px;
  display: inline-block;
  font-style: normal;
  font-weight: 400;
  line-height: 1;
  width: 18px;
  height: 14px;
}
.ms-tree-space::before {
  content: '';
}
.processContainer {
  width: 100%;
  height: 100%;
}
table td {
  line-height: 26px;
}
.tree-ctrl {
  position: relative;
  cursor: pointer;
  /*color: #2196f3;*/
  margin-left: -18px;
}
</style>
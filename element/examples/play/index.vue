<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="currentData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      @select="handleSelect"
      @select-all="handleSelectAll"
      :row-key="getRowKeys"
    >
      <el-table-column type="selection" width="55" :reserve-selection="true">
      </el-table-column>
      <el-table-column label="日期" width="120">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
      <el-table-column prop="address" label="地址" show-overflow-tooltip>
      </el-table-column>
    </el-table>
    <div class="block" style="margin-top: 20px">
      <el-pagination
        layout="sizes, prev, pager, next"
        :total="95"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5, 10]"
        :page-size="pageSize"
        :current-page="currentPage"
      >
      </el-pagination>
    </div>
    <div class="block" style="margin-top: 20px">
      <el-checkbox v-model="allCheck" @change="allCheckEvent"
        >全选所有</el-checkbox
      >
    </div>
  </div>
</template>

<script>
// https://www.geek-share.com/detail/2770870985.html
// https://www.cnblogs.com/adong69/p/11463410.html
// https://blog.csdn.net/fangge_/article/details/102859516
// https://www.cnblogs.com/adong69/p/11463410.html
// 数组是否包含某个对象 https://blog.csdn.net/sinat_24713805/article/details/103727221?utm_medium=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.control&depth_1-utm_source=distribute.pc_relevant_t0.none-task-blog-BlogCommendFromMachineLearnPai2-1.control

// 图标
// https://blog.csdn.net/weixin_44491741/article/details/106038951
// https://blog.csdn.net/weixin_30949361/article/details/101382976?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-11.control&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-11.control
// https://blog.csdn.net/qq_40291247/article/details/98598248
// https://blog.csdn.net/weixin_45274678/article/details/111831737
export default {
  data() {
    return {
      pageSize: 5,
      currentPage: 1,
      currentData: [],
      tableData: [],
      multipleSelection: [],
      allCheck: false,
    };
  },
  watch: {
    // currentData: {
    //   handler(value) {
    //     if (this.allCheck) {
    //       let that = this;
    //       let len = that.multipleSelection.length;
    //       value.forEach((row) => {
    //         for (let i = 0; i < len; i++) {
    //           if (row.date === that.multipleSelection[i].date) {
    //             that.$refs.multipleTable.toggleRowSelection(row, false);
    //             break;
    //           } else {
    //             that.$refs.multipleTable.toggleRowSelection(row, true);
    //           }
    //         }
    //       });
    //     }
    //   },
    //   deep: true,
    // },
    currentData: {
      handler(value) {
        if (this.allCheck) {
          value.forEach((row) => {
            this.$refs.multipleTable.toggleRowSelection(row, true);
          });
        } else {
          value.forEach((row) => {
            this.$refs.multipleTable.toggleRowSelection(row, false);
          });
        }
      },
    },
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSelect(selection, row) {
      console.log("selection", selection);
      console.log("row", row);
      if (this.allCheck) {
        this.allCheck = false;
      }
    },
    handleSelectAll(selection) {
      console.log("selection--", selection);
    },
    handleSizeChange(size) {
      console.log(size);
      this.pageSize = size;
      this.currentData = this.tableData.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },
    handleCurrentChange(page) {
      console.log(page);
      this.currentPage = page;
      this.currentData = this.tableData.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },
    putTableData() {
      for (let i = 0; i < 95; i++) {
        this.tableData.push({
          // index: i,
          date: i,
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        });
        this.currentData = this.tableData.slice(
          (this.currentPage - 1) * this.pageSize,
          this.currentPage * this.pageSize
        );
      }
    },
    getRowKeys(row) {
      return row.date;
    },
    allCheckEvent(val) {
      console.log("val", val);
      this.allCheck = val;
      if (val) {
        this.currentData.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row, val);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
  },
  mounted() {
    this.putTableData();
  },
};
</script>

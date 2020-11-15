<template>
  <div class="catalogTable">
    <el-table border :data="catalogTableData" default-expand-all :row-key="catalogTableProps.id">
      <config-table-col v-for="col in catalogTableCols" :key="col.prop" :column="col"></config-table-col>
    </el-table>
  </div>
</template>
<script>
import application from '@/mock/applicationData'
import configTableCol from '@/components/tableColumn/configTableCol'
import { getDefaultChecked, getMinNodeIdList, setSelectAll, getLinearList } from '@/util/objectDisposed'
export default {
  data() {
    return {
      catalogTableData: application.revokeApplyData,
      catalogTableProps: {
        id: 'plClassId',
        value: 'plClassId',
        children: 'children',
        parentId: 'parentPlClassId',
        label: 'plClassName',
        selected: 'plClassDefaultPrintFlag', //选中标识字段名称
        halfSelected: 'halfSelected2', //半选样式标识字段名称
      },
      defaultCatalogCheckedList: [],
    }
  },
  computed: {
    catalogTableSetSelectAll: {
      get() {
        return this.catalogTableData.length > 0 && this.defaultCatalogCheckedList.length === this.catalogTableListSetMinList.length
      },
      set(flag) {
        this.handleDataListCheckedAll(flag, this.catalogTableProps, 'defaultCatalogCheckedList')
      },
    },
    catalogTableListSetMinList() {
      return getMinNodeIdList(this.catalogTableData, this.catalogTableProps.children, this.catalogTableProps.id)
    },
    catelogDataListSetLinearTable() {
      return getLinearList(this.catalogTableData, this.catalogTableProps.children)
    },
    catalogTableCols() {
      return [
        {
          prop: 'fileCatalog',
          label: '文件目录',
          width: '260',
          renderHeader: (h, { column, $index }) => {
            return (
              <div class="selectable">
                <el-checkbox v-model={this.catalogTableSetSelectAll} indeterminate={this.defaultCatalogCheckedList.length > 0 && this.defaultCatalogCheckedList.length < this.catalogTableListSetMinList.length}></el-checkbox>
                <span class="selectable-label">{column.label}</span>
              </div>
            )
          },
          customValue: (h, params) => {
            return (
              <span class="selectable">
                <el-checkbox v-model={params.row[this.catalogTableProps.selected]} indeterminate={params.row[this.catalogTableProps.halfSelected]} onChange={this.handleDataListChange.bind(this, 2, params)}></el-checkbox>
                <span class="selectable-label">{params.row.plClassName}</span>
              </span>
            )
          },
        },
        {
          prop: 'fileStatus',
          label: '',
          customValue: (h, params) => {
            if (params.row.children && params.row.children.length > 0) {
              return <span></span>
            } else {
              return <span>已申请</span>
            }
          },
        },
      ]
    },
  },
  methods: {
    handleDataListCheckedAll(flag, props, checkedListName) {
      console.log(flag)
      if (!this.catalogTableListSetMinList || this.catalogTableListSetMinList.length === 0) return
      this.catalogTableListSetMinList.forEach((id) => {
        const node = this.catelogDataListSetLinearTable.getIndexById(id, props.id, true)
        const index = this[checkedListName].indexOf(id)
        node[props.selected] = flag
        if (flag) {
          index === -1 ? this[checkedListName].push(id) : ''
          setSelectAll(flag, node, props, 0, false, this.catelogDataListSetLinearTable)
        } else {
          index > -1 ? this[checkedListName].splice(index, 1) : ''
          setSelectAll(flag, node, props, 0, false, this.catelogDataListSetLinearTable)
        }
      })
      console.log('catalogTableData', this.catalogTableData)
    },
    handleDataListChange(type, scope, flag) {
      const { row } = scope
      // type 1-处理主页翻拍勾选节点数组 2-处理添加内容弹框中默认勾选的节点数组
      const checkedListName = 'defaultCatalogCheckedList'
      const props = this.catalogTableProps
      setSelectAll(flag, row, props, 0, false, this.catelogDataListSetLinearTable)
      // 处理勾选节点数组
      // 判断是否是父节点
      if (row[props.children] && row[props.children].length > 0) {
        // 父节点则把所有子节点 加入&移除 数组
        let minIds = getMinNodeIdList(row[props.children], props.children, props.id)
        minIds.forEach((id) => {
          let index = this[checkedListName].indexOf(id)
          if (flag && index === -1) {
            this[checkedListName].push(id)
          } else if (!flag && index > -1) {
            this[checkedListName].splice(index, 1)
          }
        })
      } else {
        // 点击子节点
        let index = this[checkedListName].indexOf(row[props.id])
        if (flag) {
          this[checkedListName].push(row[props.id])
        } else {
          this[checkedListName].splice(index, 1)
        }
      }
    },
  },
  created() {
    this.defaultCatalogCheckedList = getDefaultChecked(this.catalogTableData, this.catalogTableProps, true)
  },
}
</script>


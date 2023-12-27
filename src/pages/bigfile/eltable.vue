<template>
  <div class="tbList-container">
    <!-- 表格 -->
    <div class="table-box">
      <el-table :data="tableData2" style="width: 100%">
        <el-table-column label="Task Work">
          <template #default="scope">
            <span ref="testRef">测试</span>
            <el-table ref="multipleTable" :show-header="false" :data="scope.row.taskWork" style="width: 100%">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column prop="name" label="Name"></el-table-column>
            </el-table>
          </template>
        </el-table-column>
      </el-table>
      <el-table ref="multipleTable" :show-header="false" :data="taskWork" style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="Name"></el-table-column>
      </el-table>
      <el-button @click="setDefaultSelection">Set Default Selection</el-button>

    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const tableData2 = ref<any>([{
  taskWork: [{ rowSelected: true, name: '1' }]
}, {
  taskWork: [{ rowSelected: false, name: '2' }]
}]);

const taskWork = ref([{ rowSelected: true, name: '1' }, { rowSelected: false, name: '2' }]);

const multipleTable = ref();
const testRef = ref();

const setDefaultSelection = () => {
  // console.log('multipleTable.value', multipleTable.value);
  // console.log('testRef', testRef.value);
  // const selectedRows:any = tableData2.value?.[0].taskWork;
  // // console.log('selectedRows', selectedRows);
  // selectedRows?.forEach((row:any) => {
  //   // console.log('row', row);
  //   multipleTable.value.toggleRowSelection(row, true); //失效？
  // });
  multipleTable.value.toggleAllSelection(); //有效
  // taskWork.value?.forEach((row) => {
  //   console.log('row', row);
  //   setTimeout(() => {
  //     multipleTable.value.toggleRowSelection(row, true);//失效？
  //   }, 0)
  // });
};

</script>

<style lang="less" scoped>
</style>

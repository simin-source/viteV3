<template>
  <div class="work-container">
    <!-- 内容 -->
    <div class="detail-box">
      <div class="detail-border">
        <!-- 第一行  查询 | 操作按钮 -->
        <div class="search-wrap">
          <el-select v-model="selectVal" placeholder="属性三类" style="width: 150px; background-color: #373843"
            @change="comboxChanged">
            <el-option v-for="(item, index) in rolesNameList" :key="index" :value="index" :label="item" />
          </el-select>
          <div class="curSelectTip">
            当前选中 <span> {{ selectCount }} </span> 条 || 记录总数
            <span>{{ workDataList.length }}</span>
          </div>
        </div>

        <!-- 第2行 表格 -->
        <div class="table-wrap">
          <el-table ref="tableRef" :data="curTableData" style="width: 100%" :max-height="maxHeight"
            :row-key="row => row.uuid"
            :row-class-name="(row: any, rowIndex: number) => { row.index = rowIndex; if (rowIndex == activeIdex - 1) return 'heightLight' }"
            @row-click="(e: any) => handleSelect({}, e)" @header-click="headerSelectClick" @select="handleSelect">
            <el-table-column type="selection" width="40" />
            <el-table-column label="序号" type="index" :index="indexMethod" :align="'center'" width="60" />
            <el-table-column label="区号" property="zoneId" :align="'center'" />
            <el-table-column property="countId" label="作业码" :align="'center'" />
            <el-table-column property="name" label="属性三类" :align="'center'" />
          </el-table>
        </div>

        <!-- 第3行 分页 -->
        <div class="page-wrap">
          <el-pagination background :page-size="pageSize" :pager-count="10" layout="prev, pager, next"
            :total="filterTableData.length" @current-change="handleSizeChange" :current-page="currentPage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
/*

table
（1）workDataList表格所有数据，包含selected属性，该对象用于计算表格总数，选中数量，配合toggleRowSelection更新表格选中状态。（主要作用于refreshSelectionState方法中）
（2）filterTableData配合computed获取最新workDataList，用currentPage对象和slice方法实现分页
（3）curTableData用于渲染当前页表格数据，和选中状态，用于计算当前分页的最小索引和最大索引

*/

//下拉框所选内容
const selectVal = ref<string>("全部");
//下拉框列表内容
const rolesNameList = ref<string[]>(['全部']);
//当前表格对象
const tableRef = ref<any>();
const curTableData = ref<any>();
//当前分页中的页数
const currentPage = ref<number>(1);
//键盘操作，移动表格内活跃行， 最小1，最大则根据当前分页数据的长度
const activeIdex = ref<number>(1);
//分页中每页所显示的数据行数
const pageSize = ref<number>(3);
const maxHeight = ref<number>(300);
const selectCount = ref<number>(0); //所选记录总数
//作业数据列表
const workDataList: any = ref([]);

//全选|取消全选的状态值
let isSelectAll = false;
//当前活跃的数据索引
let curIdx = -1;

//更新表格序号
const indexMethod = (index: number) => {
  return index + 1 + (currentPage.value - 1) * pageSize.value;
};

//当前页数变化
const handleSizeChange = (e: number) => {
  currentPage.value = e;
};

//筛选后的表格数据 - 计算属性
const filterTableData = computed(() => {
  let tb = [];
  if (selectVal.value !== '全部') {
    tb = workDataList.value.filter(
      (data: any) => data.name.toLowerCase() === selectVal.value
    );
  } else {
    tb = workDataList.value;
  }

  curTableData.value = tb.slice(
    (currentPage.value - 1) * pageSize.value,
    currentPage.value * pageSize.value
  );
  return tb;
});

//最大分页 - 计算属性
const curMaxPage = computed(() => {
  return Math.ceil(filterTableData.value.length / pageSize.value);
});

//最大索引 - 计算属性
const curMaxIndx = computed(() => {
  return curTableData.value.length;
});

onMounted(() => {
  workDataList.value = [
    {
      uuid: 1,
      countId: '1111',
      zoneId: 'one',
      name: '属性1',
      selected: false, //选中状态
    }, {
      uuid: 2,
      countId: '2222',
      zoneId: 'two',
      name: '属性2',
      selected: false, //选中状态
    }, {
      uuid: 3,
      countId: '3333',
      zoneId: 'three',
      name: '属性3',
      selected: false, //选中状态
    }, {
      uuid: 4,
      countId: '1111',
      zoneId: 'one',
      name: '属性4',
      selected: false, //选中状态
    }, {
      uuid: 5,
      countId: '2222',
      zoneId: 'two',
      name: '属性1',
      selected: false, //选中状态
    }, {
      uuid: 6,
      countId: '3333',
      zoneId: 'three',
      name: '属性6',
      selected: false, //选中状态
    }, {
      uuid: 7,
      countId: '3333',
      zoneId: 'three',
      name: '属性2',
      selected: false, //选中状态
    },
  ];
  workDataList.value.forEach(item => {
    const mIdx = rolesNameList.value.indexOf(item.name);
    if (mIdx === -1) rolesNameList.value.push(item.name);
  });
  window.addEventListener("keydown", onKeyDown, false);
});

onUnmounted(() => {
  window.removeEventListener("keydown", onKeyDown, false);
});

//监听分页
watch(currentPage, () => {
  curTableData.value = filterTableData.value.slice(
    (currentPage.value - 1) * pageSize.value,
    currentPage.value * pageSize.value
  );
  //更新勾选状态
  refreshSelectionState();
});

//键盘监听
const onKeyDown = (e: KeyboardEvent) => {
  console.log(e.key);
  // changeList();

};

function changeList(type: "up" | "down") {
  //最小分页数
  const minPage = 1;
  //最大分页数
  const maxPage = curMaxPage.value;
  //当前分页的最小索引
  const minIndx = 1;
  //当前分页的最大索引
  const maxIndx = curMaxIndx.value;

  console.log("maxPage", maxPage);
  console.log("maxIndx", maxIndx);
  console.log("currentPage", currentPage.value);

  console.log("activeIdex---before", activeIdex.value);

  if (type === "up") {
    //最小页数 最小索引
    if (minPage === currentPage.value && activeIdex.value === minIndx) return;
    if (activeIdex.value === minIndx) {
      currentPage.value--;

      setTimeout(() => {
        activeIdex.value = curMaxIndx.value;
      }, 100);

    } else {
      activeIdex.value--;
    }
  } else if (type === "down") {
    //最大页数 最大索引
    if (maxPage === currentPage.value && activeIdex.value === maxIndx) return;

    //翻页
    if (activeIdex.value === maxIndx) {
      currentPage.value++;
      activeIdex.value = minIndx;
    } else {
      activeIdex.value++;
    }
  }
  console.log("activeIdex-after", activeIdex.value);
}

//全选按钮的点击事件
const headerSelectClick = (column: { type: string }, event: { preventDefault: () => void }) => {
  event.preventDefault();
  //切换全选|取消
  if (column.type === "selection") {
    isSelectAll = !isSelectAll;
  }

  //全选 -  更新原始表的属性=true
  if (isSelectAll) {
    workDataList.value.map((m: any) => {
      //存在下拉筛选条件（0线、1线...）
      if (selectVal.value !== "全部") {
        if (m.name === selectVal.value) {
          m.selected = true;
        } else {
          m.selected = false;
        }
      } else {
        m.selected = true;
      }
    });
  } else {
    //取消 - 更新原始表的属性=false
    workDataList.value.map((m: any) => {
      m.selected = false;
    });
  }

  //刷新勾选状态
  refreshSelectionState();
};

//表格第1列的勾选,行点击
const handleSelect = (selection: any, row: any) => {
  activeIdex.value = row.index + 1;
  curIdx = -1;
  workDataList.value.map((m: any, index: number) => {
    if (m.uuid === row.uuid) {
      m.selected = !row.selected;
      curIdx = index;
    }
  });
  refreshSelectionState();
};

//搜索 下拉框的内容 变更
const comboxChanged = (e: any) => {
  currentPage.value = 1;
  isSelectAll = false;
  workDataList.value.map((m: any) => {
    m.selected = false;
  });
  if (e !== 0) {
    selectVal.value = rolesNameList.value[e];
  } else {
    selectVal.value = '全部';
  }
  refreshSelectionState();
};

//刷新数据的勾选|取消状态
const refreshSelectionState = () => {
  //计算选中数量和添加选中状态
  setTimeout(() => {
    //计时器解决toggleRowSelection失效问题
    selectCount.value = 0;
    const selectListIndex: number[] = [];
    workDataList.value.map((m: any, index: number) => {
      tableRef.value?.toggleRowSelection(m, m.selected);
      if (m.selected) {
        selectCount.value++;
        selectListIndex.push(index);
      }
    });
  }, 100);
};

</script>

<style lang="less">
.work-container {
  // position: relative;
  z-index: 1;
  font-size: 100px;
  color: #ccc;
  width: 100%;
  height: 100%;

  //内容
  .detail-box {
    width: 100%;
    height: calc(100% - 40px);
    background-color: #2b2d36;
    padding: 20px 20px 0 20px;
    box-sizing: border-box;

    .detail-border {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;

      .search-wrap {
        position: relative;
        width: 100%;
        height: 36px;
        // background: #373843;
        margin-bottom: 10px;

        display: flex;
        align-items: center;

        .el-input,
        .el-select {
          display: flex;
        }

        .curSelectTip {
          font-size: 14px;
          color: #ffffff;
          line-height: 20px;
          letter-spacing: 1px;
          margin-left: 10px;

          span {
            color: #409eff;
            font-weight: bold;
          }
        }
      }

      .table-wrap {
        height: calc(100% - 100px);
        width: 100%;
        overflow: hidden;

        .heightLight {
          background: #262727;
        }
      }

      .page-wrap {
        display: flex;
        justify-content: center;
        margin-top: 10px;
      }
    }
  }
}
</style>

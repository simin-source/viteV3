<template>
  <div class="work-container" ref="workContainerRef">
    <!-- 标题 -->
    <div class="title-box flex-row-align-between">
      <p class="content">作业数据查看器</p>
      <div class="flex-row">
        <div class="scale-border" @click="requestFullscreen">
          <img :src="resource?.imgUrl?.scale" alt="图片找不到" />
        </div>
        <div class="close-border" @click="closeModule">
          <img :src="resource?.imgUrl?.close" alt="图片找不到" />
        </div>
        <!-- <el-icon class="close_btn" size="17" @click="closeModule">
          <Close />
        </el-icon> -->
      </div>
    </div>

    <!-- 内容 -->
    <div class="detail-box">
      <div class="detail-border">
        <!-- 第一行  查询 | 操作按钮 -->
        <div class="search-wrap">
          <el-select v-model="selectVal" placeholder="属性三类" style="width: 150px; background-color: #373843"
            @change="comboxChanged">
            <el-option v-for="(item, index) in rolesNameList" :key="index" :value="index" :label="item" />
          </el-select>
          <el-input v-model="searchVal" placeholder="输入筛选内容" class="input-with-select" style="width: 350px"
            v-if="isShowQueryInput" @blur="() => permission.keyFunState.value = true"
            @focus="() => permission.keyFunState.value = false">
          </el-input>
          <div class="curSelectTip">
            当前选中 <span> {{ selectCount }} </span> 条 || 记录总数
            <span>{{ workDataList.length }}</span>
          </div>
        </div>

        <!-- 第2行 表格 -->
        <div class="table-wrap">
          <el-table ref="tableRef" :data="curTableData" style="width: 100%" :max-height="maxHeight" :row-class-name="({ row, rowIndex }) => {
            row.index = rowIndex;
            if (rowIndex == activeIdex - 1) {
              return 'heightLight'
            }
          }
            " @row-click="handleRowClick" @header-click="headerSelectClick" @selection-change="handleSelectionChange"
            @select="handleSelect">
            <el-table-column type="selection" width="40" />
            <el-table-column label="序号" type="index" :index="indexMethod" :align="'center'" width="60" />
            <el-table-column label="区号" property="zoneId" :align="'center'">
              <!-- <template #default="scope">{{ scope.row.selected }}</template> -->
            </el-table-column>
            <el-table-column property="countId" label="作业码" :align="'center'" />
            <el-table-column property="code" label="属性码" :align="'center'" />
            <el-table-column property="s_kind" label="属性二类" :align="'center'" />
            <el-table-column property="t_kind" label="属性三类" :align="'center'" />
            <el-table-column property="props1" label="额外属性1" :align="'center'" />
            <el-table-column property="props2" label="额外属性2" :align="'center'" />
            <el-table-column property="markDate" label="标记时间" :align="'center'" />
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
import { ref, computed, toRaw, onMounted, watch } from "vue";
//@ts-ignore
import { Search } from "@element-plus/icons-vue";
import { permission } from "@/plugins/permission";

import { useMutations, useGetters } from "@/uitls/useStore";

//@ts-ignore
const { setModuleList } = useMutations(["setModuleList"], "assist");
//@ts-ignore
const { getModuleList } = useGetters(["getModuleList"], "assist");

//搜索内容f
let searchVal = ref<string>("");
//下拉框所选内容
const selectVal = ref<string>("全部");
//下拉框列表内容
const rolesNameList = ref<string[] | any>();
//当前表格对象
const tableRef = ref<any>();
const curTableData = ref<any>();

//当前分页中的页数
const currentPage = ref<number>(1);
//分页中每页所显示的数据行数
const pageSize = ref<number>(5);
const maxHeight = ref<number>(300);
//资源对象
let resource = ref<any>();

const funObj = ref<any>([]); //快捷键功能映射
const selectCount = ref<number>(0); //所选记录总数

//是否显示搜索框
let isShowQueryInput = ref<boolean>(true);
//全选|取消全选的状态值
let isSelectAll: boolean = false;
//作业数据列表
let workDataList: any = ref([]);

//当前活跃的数据索引 - 用于send2main，根据锚点坐标
let curIdx: number = -1;

//当前窗口对象
const workContainerRef = ref();

//键盘操作，移动表格内活跃行， 最小1，最大则根据当前分页数据的长度
const activeIdex = ref<number>(1);
/*

table
（1）workDataList表格所有数据，包含selected属性，该对象用于计算表格总数，选中数量，配合toggleRowSelection更新表格选中状态。（主要作用于refreshSelectionState方法中）
（2）filterTableData配合computed获取最新workDataList，用currentPage对象和slice方法实现分页
（3）curTableData用于渲染当前页表格数据，和选中状态，用于计算当前分页的最小索引和最大索引

*/

onMounted(() => {
  funObj.value = [
    {
      name: "workListMoveUp",
      fun: changeList,
    },
    {
      name: "workListMoveDown",
      fun: changeList,
    },
    {
      name: "workDataDelete",
      fun: undefined,
    },
    {
      name: "workDataCheckAll",
      fun: undefined,
    },
    {
      name: "workDataFilter",
      fun: undefined,
    },
  ];
  updateTableMaxHeight();
});

//更新表格序号
const indexMethod = (index: number) => {
  return index + 1 + (currentPage.value - 1) * pageSize.value;
};

//当前页数变化
const handleSizeChange = (e: number) => {
  currentPage.value = e;

  //更新勾选状态
  refreshSelectionState(false);
};

//筛选后的表格数据 - 计算属性
const filterTableData = computed(() => {
  let tb = [];
  if (!isShowQueryInput.value) {
    tb = workDataList.value.filter(
      (data: any) => data.t_kind.toLowerCase() === selectVal.value
    );
  } else {
    tb = workDataList.value.filter(
      (data: any) =>
        !searchVal.value ||
        data.zoneId
          .toString()
          .toLowerCase()
          .includes(searchVal.value.toLowerCase()) ||
        data.countId
          .toString()
          .toLowerCase()
          .includes(searchVal.value.toLowerCase()) ||
        data.code
          .toString()
          .toLowerCase()
          .includes(searchVal.value.toLowerCase()) ||
        data.s_kind.toLowerCase().includes(searchVal.value.toLowerCase()) ||
        data.t_kind.toLowerCase().includes(searchVal.value.toLowerCase()) ||
        data.props1.toLowerCase().includes(searchVal.value.toLowerCase()) ||
        data.props2.toLowerCase().includes(searchVal.value.toLowerCase())
    );
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

//监听分页
watch(currentPage, () => {
  curTableData.value = filterTableData.value.slice(
    (currentPage.value - 1) * pageSize.value,
    currentPage.value * pageSize.value
  );

  console.log("filterTableData", curTableData.value.length);
});

watch(searchVal, () => {
  workDataList.value.map((m: any) => {
    m.selected = false;
  });
  isSelectAll = false;
  refreshSelectionState();
});

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

  //向上选择
  if (type == "up") {
    //最小页数 最小索引
    if (minPage == currentPage.value && activeIdex.value == minIndx) return;
    if (activeIdex.value == minIndx) {
      currentPage.value--;

      setTimeout(() => {
        activeIdex.value = curMaxIndx.value;
      }, 100);

    } else {
      activeIdex.value--;
    }
  }

  //向下选择
  else if (type == "down") {
    //最大页数 最大索引
    if (maxPage == currentPage.value && activeIdex.value == maxIndx) return;

    //翻页
    if (activeIdex.value == maxIndx) {
      currentPage.value++;
      activeIdex.value = minIndx;
    } else {
      activeIdex.value++;
    }
  }


  console.log("activeIdex-after", activeIdex.value);
}

//表格第1列的勾选|取消事件
//@ts-ignore
const handleSelect = (selection, row) => {
  activeIdex.value = row.index + 1;
  updateWorkDataListSelection(row.uuid, !row.selected);
  refreshSelectionState();
};

//@ts-ignore
const handleSelectionChange = (data) => {
  // console.log("handleSelectionChange", data);
};

//全选按钮的点击事件
const headerSelectClick = (column, event) => {
  event.preventDefault();
  //切换全选|取消
  if (column.type == "selection") {
    isSelectAll = !isSelectAll;
  }

  // console.log("headerSelectClick",isSelectAll,selectVal.value != "全部",searchVal.value != "")
  //全选 -  更新原始表的属性=true
  if (isSelectAll) {
    workDataList.value.map((m: any) => {
      //存在下拉筛选条件（0线、1线...）
      if (selectVal.value != "全部") {
        if (m.t_kind == selectVal.value) {
          m.selected = true;
        } else {
          m.selected = false;
        }
      }
      //存在模糊搜索条件
      else if (searchVal.value != "") {
        m.selected = false;
        curTableData.value.forEach((f: any) => {
          if (m.uuid == f.uuid) {
            m.selected = true;
          }
        });
      }
      //默认为全部，无查询条件
      else {
        m.selected = true;
      }
    });
  }
  //取消 - 更新原始表的属性=false
  else {
    workDataList.value.map((m: any) => {
      m.selected = false;
    });
  }

  //刷新勾选状态
  refreshSelectionState();
};

//单击row，选中或取消选中勾选的事件
const handleRowClick = (e: any) => {
  activeIdex.value = e.index + 1;
  updateWorkDataListSelection(e.uuid, !e.selected);
  refreshSelectionState();
};

//搜索 下拉框的内容 变更
const comboxChanged = (e: any) => {
  // console.log(e, rolesNameList.value[e]);
  searchVal.value = "";
  currentPage.value = 1;
  if (e == 0) {
    isShowQueryInput.value = true;
  } else {
    isShowQueryInput.value = false;
    selectVal.value = rolesNameList.value[e];
  }
  workDataList.value.map((m: any) => {
    m.selected = false;
  });
  isSelectAll = false;
  refreshSelectionState();
};

// 关闭当前模块
function closeModule() {
  let list = getModuleList.value.filter((item) => {
    return item.id !== 4;
  });
  setModuleList(list);
}

//更新当前分页的索引值，切换分页
const updateCurrentPage = (selectIndex: number) => {
  //数据的序号
  const num = selectIndex + 1;
  //数据的序号 / 当页的行数
  const val = Math.floor(num / pageSize.value);
  //求余数，判断是当前页，还是下一页
  currentPage.value = num % pageSize.value == 0 ? val : val + 1;
};

//刷新数据的勾选|取消状态
const refreshSelectionState = (isSend2Main: boolean = true) => {
  setTimeout(() => {
    console.log("refreshSelectionState");
    selectCount.value = 0;

    let selectListIndex: number[] = [];
    workDataList.value.map((m: any, index: number) => {
      tableRef.value.toggleRowSelection(m, m.selected);
      if (m.selected) {
        selectCount.value++;
        selectListIndex.push(index);
      }
    });

    if (isSend2Main) {
      //@ts-ignore childToMain
      window.api.send("c2e_send", {
        method: "updateSelectIndexList",
        obj: {
          selectListIndex: selectListIndex,
          curIdx: curIdx,
        },
      });
    }
  }, 100);
};

//更新原始表的勾选状态值
const updateWorkDataListSelection = (uuid: string, isChecked: boolean) => {
  curIdx = -1;
  workDataList.value.map((m: any, index: number) => {
    if (m.uuid == uuid) {
      m.selected = isChecked;
      curIdx = index;
    }
  });
};

/* 从mainWin传过来的数据 */
//@ts-ignore
window.api.receive("e2c_receive_work", (res: any) => {
  console.log("childwin - e2c_receive_work", res);
  //首次打开 | 更新作业数据
  if (res.method == "updateChildWorkDataList") {
    updateChildWorkDataList(res);
  }
  //变更勾选的rows
  else if (res.method == "updateChildSelectionRows") {
    //还原查询条件
    selectVal.value = "全部";
    isShowQueryInput.value = true;

    //获取当前数据的uuid
    const uuid = res.list.uuid;
    //获取勾选|取消行为 true=勾选， false=取消
    const isChecked = res.list.isChecked;

    //更新workDataList的selected属性值
    updateWorkDataListSelection(uuid, isChecked);
    //勾选，则获取分页,切换分页
    if (isChecked) {
      updateCurrentPage(curIdx);
    }
    //刷新数据的勾选|取消状态
    refreshSelectionState(false);
  }

  //清空勾选
  else if (res.method == "unCheckedAllSelectionRows") {
    workDataList.value.map((m: any) => {
      m.selected = false;
    });
    isSelectAll = false;
    //刷新数据的勾选|取消状态
    refreshSelectionState(false);
  }
});

/* 组件之间交互 */
const emit = defineEmits();

//@ts-ignore
const emitEvent = (params: any) => {
  emit("childEvent", params);
};

//父级事件 - 全屏显示当前组件
const requestFullscreen = () => {
  emit("requestFullscreen");
  refreshSelectionState();
};

//export函数
//更新属性数据
const updateWorkDataProps = (propObj: any) => {
  console.log("updateWorkDataProps", propObj);

  let selectionArr: any[] = [];
  rolesNameList.value = ["全部"];
  workDataList.value.forEach((f2: any) => {
    if (f2.selected) {
      selectionArr.push(f2);
      f2.code = propObj.code;
      f2.s_kind = propObj.name2;
      f2.s_code = propObj.code2;
      f2.t_kind = propObj.name;
      f2.t_code = propObj.code;

      f2.FLCodeDisc = propObj.FLCodeDisc;
      f2.FLCodeType = propObj.FLCodeType;
      f2.FLCodeDefaultValue = propObj.FLCodeDefaultValue;
      if (propObj.FLCodeValue != "") {
        f2.FLCodeValue = propObj.FLCodeValue;
      }

      f2.SLCodeDisc = propObj.SLCodeDisc;
      f2.SLCodeType = propObj.SLCodeType;
      f2.SLCodeDefaultValue = propObj.SLCodeDefaultValue;
      if (propObj.SLCodeValue != "") {
        f2.SLCodeValue = propObj.SLCodeValue;
      }
      // console.log("propObj.FLCodeValue",propObj.FLCodeValue, f2.FLCodeValue)
      f2.props1 =
        f2.FLCodeDisc !== "" ? f2.FLCodeDisc + ":" + f2.FLCodeValue : "";
      f2.props2 =
        f2.SLCodeDisc !== "" ? f2.SLCodeDisc + ":" + f2.SLCodeValue : "";

      f2.color = propObj.color;
      f2.width = propObj.width;
      f2.v_color = propObj.v_color;
      f2.v_width = propObj.v_width;
      f2.dashedColor = propObj.dashedColor;
      f2.v_dashedColor = propObj.v_dashedColor;
      f2.geo_type = propObj.geo_type;

      // console.log(f, propObj,f2);
    }

    //下拉筛选框更新
    let mIdx = rolesNameList.value.indexOf(f2.t_kind);
    if (mIdx == -1) rolesNameList.value.push(f2.t_kind);
  });

  refreshSelectionState(false);

  //更新mainWin的模型属性
  //去掉proxy属性，不然数据无法通信
  const selection = selectionArr.map((m: any) => {
    return toRaw(m);
  });

  console.log("更新属性", selection);

  if (selection.length == 0) return;
  //@ts-ignore
  window.api.send("c2e_send", {
    method: "updateThreeObjProps",
    obj: selection,
  });
};

//设置资源对象
const setResource = (obj) => {
  // console.log("work", obj);
  resource.value = obj;
};

//更新作业数据
const updateChildWorkDataList = (res) => {
  workDataList.value = [];
  rolesNameList.value = ["全部"];
  console.log("updateChildWorkDataList", res);

  res.list.map((m: any) => {
    //作业数据
    workDataList.value.push({
      countId: m.props.countId,
      zoneId: m.props.zoneId,
      code: m.props.code,
      s_kind: m.props.s_name,
      s_code: m.props.s_code,
      t_kind: m.props.name,
      t_code: m.props.code,
      props1: m.props.FLCodeDisc
        ? m.props.FLCodeDisc + ":" + m.props.FLCodeValue
        : "",
      props2: m.props.SLCodeDisc
        ? m.props.SLCodeDisc + ":" + m.props.SLCodeValue
        : "",
      FLCodeDisc: m.props.FLCodeDisc,
      FLCodeValue: m.props.FLCodeValue,
      SLCodeDisc: m.props.SLCodeDisc,
      SLCodeValue: m.props.SLCodeValue,
      markDate: m.props.start_time,
      uuid: m.props.uuid,

      //隐藏的数据
      color: m.props.color,
      width: m.props.width,
      v_color: m.props.v_color,
      v_width: m.props.v_width,
      dashedColor: m.props.dashedColor,
      v_dashedColor: m.props.v_dashedColor,
      geo_type: m.props.geo_type,
      selected: false, //初始化表格数据的选中状态
    });

    //下拉筛选框更新
    let mIdx = rolesNameList.value.indexOf(m.props.name);
    // console.log("mIdx", mIdx);
    if (mIdx == -1) rolesNameList.value.push(m.props.name);
  });

  //刷新数据的勾选|取消状态
  refreshSelectionState(false);
};

//更新表格的最大高度
function updateTableMaxHeight() {
  setTimeout(() => {
    if (!workContainerRef?.value) return;

    maxHeight.value = workContainerRef?.value?.clientHeight - 170;

    const num2 = workContainerRef.value.clientWidth < 1000 ? 70 : 43;

    const newPageSize = Math.round(maxHeight.value / num2);
    pageSize.value = newPageSize < 4 ? 4 : newPageSize;

    console.log(
      workContainerRef.value.clientHeight,
      workContainerRef.value.clientWidth,
      maxHeight.value,
      pageSize.value
    );
  }, 100);
}

defineExpose({
  updateWorkDataProps,
  updateTableMaxHeight,
  updateChildWorkDataList,
  setResource,
  funObj,
});
</script>

<style lang="less">
.work-container {
  // position: relative;
  z-index: 1;
  font-size: 100px;
  color: #ccc;
  width: 100%;
  height: 100%;

  //标题
  .title-box {
    width: 100%;
    height: 40px;
    background: #373843;

    .content {
      margin-left: 30px;
      height: 20px;
      font-size: 14px;
      font-weight: 500;
      color: #ffffff;
      line-height: 20px;
      letter-spacing: 1px;
    }

    .close-border,
    .scale-border {
      cursor: pointer;
      height: 100%;
      display: flex;
      align-items: center;

      img {
        padding-left: 10px;
        margin-right: 25px;
        width: 16px;
        height: 17px;
      }
    }

    .close_btn {
      margin-right: 25px;
      cursor: pointer;
    }
  }

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

import { defineComponent } from 'vue';

import {
  BarChart, LineChart
} from 'echarts/charts';
import {
  GridComponent,
  LegendComponent,
  TooltipComponent,
  TooltipComponentOption,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  BarChart,
  LineChart,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  CanvasRenderer,
  UniversalTransition,
]);

type EChartsOption = echarts.ComposeOption<
  | TooltipComponentOption
>;

import { commSotre } from '@/store/common';
import { getMonthDays } from '@/utils/time';
import { Col, Row, Select, SelectOption, SelectOptGroup, Statistic, Tag } from 'ant-design-vue';
import './Bar.css';

function getVirtulData(num: number) {
  const data = [];
  for (let i = 0; i < num; i++) {
    data.push(Math.round(Math.random() * 195));
  }
  // console.log(data);
  return data;
}

enum UnitType {
  Today = 'Today',
  Yesterday = 'Yesterday',
  ThisWeek = 'ThisWeek',
  LastWeek = 'LastWeek',
  ThisMonth = 'ThisMonth',
  LastMonth = 'LastMonth',
  Last90Days = 'Last90Days',
  ThisYear = 'ThisYear',
}

export default defineComponent({
  name: 'Bar', // 柱状图
  data() {
    return {
      myChart: {} as any,
      unit: UnitType.Today, //this.unitToXAxis(this.unit, '浏览量')
      statisticData: {
        pv: { value: 1410, change: 155 },
        uv: { value: 266, change: 31 },
      },
      option: {
        tooltip: {
          position: 'top',
          triggerOn: 'mousemove',
          // renderMode: 'html',
          // formatter: (params: any) => {
          //   return `<div style="display:flex;flex-direction:column;justify-content:center;align-items:center; ">
          //       <div style="color:#4A4A4A;font-size: 10px;">${this.getXAxis()[params?.dataIndex]}</div>
          //       <div>
          //       <span style="color:#FD643B;font-size: 13px;font-weight: 600;">${params?.data}</span>
          //       <span style="font-size: 12px;font-weight: 600;margin-left:5px">${params?.seriesName}</span>
          //       </div>
          //   </div>`;
          // },
        },
        legend: {
          bottom: 20,
          data: [{ name: '浏览量', itemStyle: { color: 'rgba(25,144,255,0.6)' } }, { name: '访客', itemStyle: { color: 'rgba(122,169,255,0.5)' } }],
          orient: 'horizontal', //横向布局
          icon: 'circle',
          itemWidth: 8,
          itemHeight: 8,
          itemGap: 20,
          textStyle: {
            fontSize: 10,
          },
        },
        grid: { left: 35, top: 40, right: 20 },
        color: ['rgba(25,144,255,0.6)', 'rgba(122,169,255,0.5)'],
        xAxis: [
          {
            type: 'category', //类目轴
            axisTick: { //刻度
              show: false,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#E3E3E3', //无法设置宽度
              },
            },
            axisLabel: {
              color: '#4A4A4A',
              fontWeight: 500,
              fontSize: 10,
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            min: 0,
            max: 200, //TODO判断取值范围
            interval: 50, //坐标轴间距
            axisLine: {
              show: true,
              lineStyle: {
                color: '#E3E3E3', //无法设置宽度
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                // type: 'dashed',
                color: 'rgba(227, 227, 227)',
              },
            },
            axisLabel: {
              color: '#4A4A4A',
              fontWeight: 500,
              fontSize: 10,
            },
            axisTick: {
              show: true,
            },
          },
        ],
        series: [
          {
            name: '浏览量',
            type: 'bar',
            colorBy: 'series', //同一系列颜色
            // stack: 'x', //柱状图叠加
          }, {
            barGap: '-100%', //柱状图覆盖
            name: '访客',
            type: 'bar',
            colorBy: 'series',
            // stack: 'x',
          },
        ],
      } as EChartsOption,
    };
  },
  mounted() {
    const chartDom = document.getElementById('bar') as HTMLElement; //容器
    this.myChart = echarts.init(chartDom); //初始化
    this.myChart.showLoading();
    this.myChart.setOption(this.option); // 配置项
    this.unitToXAxis(UnitType.Today);
    if (this.statisticData.pv.change) {
      let count = 0;
      let timer: any = null;
      timer = setInterval(() => {
        count++;
        this.statisticData.pv.value++;
        if (count === this.statisticData.pv.change) clearInterval(timer);
      }, 10);
    }
    if (this.statisticData.uv.change) {
      let count = 0;
      let timer: any = null;
      timer = setInterval(() => {
        count++;
        this.statisticData.uv.value++;
        if (count === this.statisticData.uv.change) clearInterval(timer);
      }, 10);
    }
    const headerDom = document.getElementsByClassName('bar_header')[0] as any;
    window.onscroll = this.debounce(() => {
      const scrollTop = document.body.scrollTop ? document.body.scrollTop : document.documentElement.scrollTop;
      if (scrollTop > headerDom.offsetHeight) {
        headerDom.style.position = 'fixed';
        headerDom.style.padding = '20px 60px';
        headerDom.style.borderBottom = '1px solid #E1E1E1';
      } else {
        headerDom.style.position = 'relative';
        headerDom.style.padding = '20px 0 0 0';
        headerDom.style.borderBottom = 'none';
      }
    });
  },
  methods: {
    // getXAxis() {
    //   const this_month = new Date().getMonth();
    //   let xAxisData = [];
    //   switch (this.unit) {
    //     case UnitType.Today:
    //       return ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
    //     case UnitType.Yesterday:
    //       return ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
    //     case UnitType.ThisWeek:
    //       return ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    //     case UnitType.LastWeek:
    //       return ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    //     case UnitType.ThisMonth:
    //       xAxisData = [];
    //       for (let index = 1; index < getMonthDays(this_month) + 1; index++) {
    //         xAxisData.push(`${this_month}月${index}`);
    //       }
    //       return xAxisData;
    //     case UnitType.LastMonth:
    //       xAxisData = [];
    //       let last_month = this_month - 1;
    //       if (last_month === 0) {
    //         last_month = 12;
    //       }
    //       for (let index = 1; index < getMonthDays(last_month) + 1; index++) {
    //         xAxisData.push(`${last_month}月${index}`);
    //       }
    //       return xAxisData;
    //     case UnitType.Last90Days:
    //       xAxisData = [];
    //       let last_1month = this_month - 1;
    //       let last_2month = last_1month - 1;
    //       if (this_month - 1 === 0) {
    //         last_1month = 12;
    //         last_2month = 11;
    //       }
    //       if (last_1month - 1 === 0) {
    //         last_2month = 12;
    //       }
    //       const this_month_days = getMonthDays(this_month);
    //       const last_1month_days = getMonthDays(last_1month);
    //       const last_2month_days = getMonthDays(last_2month);

    //       for (let index = 1; index < last_2month_days + 1; index++) {
    //         xAxisData.push(`${last_2month}月${index}`);
    //       }
    //       for (let index = 1; index < last_1month_days + 1; index++) {
    //         xAxisData.push(`${last_1month}月${index}`);
    //       }
    //       for (let index = 1; index < this_month_days + 1; index++) {
    //         xAxisData.push(`${this_month}月${index}`);
    //       }
    //       return xAxisData;
    //     case UnitType.ThisYear:
    //       return ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    //     default:
    //       return ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
    //   }
    // },
    unitToXAxis(unit: UnitType, queryType?: string) {
      // TODO根据时间类型查询数据
      const this_month = new Date().getMonth();
      let xAxisData = [];
      switch (unit) {
        case UnitType.Today:
          // TODO根据时间类型查询数据
          this.myChart.hideLoading();
          this.myChart.setOption({
            xAxis: {
              data: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
            },
            series: [{
              name: queryType ? queryType : '浏览量',
              data: getVirtulData(24),
            }, {
              name: queryType ? queryType : '访客',
              data: getVirtulData(24),
            }],
          });
          break;
        case UnitType.Yesterday:
          this.myChart.hideLoading();
          this.myChart.setOption({
            xAxis: {
              data: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
            },
            series: [{
              name: queryType ? queryType : '浏览量',
              data: getVirtulData(24),
            }, {
              name: queryType ? queryType : '访客',
              data: getVirtulData(24),
            }],
          });
          break;
        case UnitType.ThisWeek:
          this.myChart.hideLoading();
          this.myChart.setOption({
            xAxis: {
              data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            },
            series: [{
              name: queryType ? queryType : '浏览量',
              data: getVirtulData(7),
            }, {
              name: queryType ? queryType : '访客',
              data: getVirtulData(7),
            }],
          });
          break;
        case UnitType.LastWeek:
          this.myChart.hideLoading();
          this.myChart.setOption({
            xAxis: {
              data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            },
            series: [{
              name: queryType ? queryType : '浏览量',
              data: getVirtulData(7),
            }, {
              name: queryType ? queryType : '访客',
              data: getVirtulData(7),
            }],
          });
          break;
        case UnitType.ThisMonth:
          this.myChart.hideLoading();
          xAxisData = [];
          for (let index = 1; index < getMonthDays(this_month) + 1; index++) {
            xAxisData.push(`${this_month}月${index}`);
          }
          this.myChart.setOption({
            xAxis: {
              data: xAxisData,
            },
            series: [{
              name: queryType ? queryType : '浏览量',
              data: getVirtulData(getMonthDays(this_month)),
            }, {
              name: queryType ? queryType : '访客',
              data: getVirtulData(getMonthDays(this_month)),
            }],
          });
          break;
        case UnitType.LastMonth:
          this.myChart.hideLoading();
          xAxisData = [];
          let last_month = this_month - 1;
          if (last_month === 0) {
            last_month = 12;
          }
          for (let index = 1; index < getMonthDays(last_month) + 1; index++) {
            xAxisData.push(`${last_month}月${index}`);
          }
          this.myChart.setOption({
            xAxis: {
              data: xAxisData,
            },
            series: [{
              name: queryType ? queryType : '浏览量',
              data: getVirtulData(getMonthDays(last_month)),
            }, {
              name: queryType ? queryType : '访客',
              data: getVirtulData(getMonthDays(last_month)),
            }],
          });
          break;
        case UnitType.Last90Days:
          this.myChart.hideLoading();
          xAxisData = [];
          let last_1month = this_month - 1;
          let last_2month = last_1month - 1;
          if (this_month - 1 === 0) {
            last_1month = 12;
            last_2month = 11;
          }
          if (last_1month - 1 === 0) {
            last_2month = 12;
          }
          const this_month_days = getMonthDays(this_month);
          const last_1month_days = getMonthDays(last_1month);
          const last_2month_days = getMonthDays(last_2month);

          for (let index = 1; index < last_2month_days + 1; index++) {
            xAxisData.push(`${last_2month}月${index}`);
          }
          for (let index = 1; index < last_1month_days + 1; index++) {
            xAxisData.push(`${last_1month}月${index}`);
          }
          for (let index = 1; index < this_month_days + 1; index++) {
            xAxisData.push(`${this_month}月${index}`);
          }
          this.myChart.setOption({
            xAxis: {
              data: xAxisData,
            },
            series: [{
              data: getVirtulData(this_month_days + last_1month_days + last_2month_days),
            }],
          });
          break;
        case UnitType.ThisYear:
          this.myChart.hideLoading();
          this.myChart.setOption({
            xAxis: {
              data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            },
            series: [{
              name: queryType ? queryType : '浏览量',
              data: getVirtulData(12),
            }, {
              name: queryType ? queryType : '访客',
              data: getVirtulData(12),
            }],
          });
          break;
        default:
          this.myChart.hideLoading();
          this.myChart.setOption({
            xAxis: {
              data: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
            },
            series: [{
              name: queryType ? queryType : '浏览量',
              data: getVirtulData(24),
            }, {
              name: queryType ? queryType : '访客',
              data: getVirtulData(7),
            }],
          });
          break;
      }
      this.option.xAxis = [];
    },
    debounce(fn: any) {
      let timeout: NodeJS.Timeout;
      return () => {
        if (timeout) {
          clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
          fn.apply(this, arguments);
        }, 10);
      };
    },
  },
  render() {
    return <div class="bar_box">
      <div class="bar_header">
        <div class="tags"
          style={{ marginBottom: `${commSotre.tagList && commSotre.tagList.length > 0 ? '10px' : '0'}` }}
        >
          {commSotre.tagList?.map(item => {
            // const key = item.split(':')[0];
            // const value = item.split(':')[1];
            return <Tag closable color="#000000" class="tag_item"
              onClose={() => {
                if (commSotre.tagList) {
                  const index = commSotre.tagList?.indexOf(item);
                  if (index !== -1) commSotre.tagList?.splice(index, 1);
                }
              }}>{item}</Tag>;
          })}
        </div>
        <div>
          <Row>
            <Col span={160}>
              <Statistic title="浏览量" value={this.statisticData.pv.value} style={{ marginRight: '50px' }} />
            </Col>
            <Col span={160}>
              <Statistic title="访客" value={this.statisticData.uv.value} />
            </Col>
          </Row>
          <Select v-model:value={this.unit} class="unit_select" onChange={() => {
            this.myChart.showLoading();
            this.unitToXAxis(this.unit);
          }}>
            {/* <SelectOptGroup v-slots={{
            label: () => (<div class="label">Today</div>),
          }}>
          </SelectOptGroup> */}
            <SelectOption value="Today">Today</SelectOption>
            <SelectOption value="Yesterday">Yesterday</SelectOption>
            <SelectOption value="ThisWeek">This week</SelectOption>
            <SelectOption value="LastWeek">Last week</SelectOption>
            <SelectOption value="ThisMonth">This month</SelectOption>
            <SelectOption value="LastMonth">Last month</SelectOption>
            <SelectOption value="Last90Days">Last 90 days</SelectOption>
            <SelectOption value="ThisYear">This year</SelectOption>
          </Select>
        </div>
      </div>
      <div id="bar" />
    </div>;
  },
});

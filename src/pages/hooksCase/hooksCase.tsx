import Button from '@/components/button/Button';
import Mock from 'mockjs';
import { Fragment } from 'vue';

import mySwiper from '@/components/mySwiper/mySwiper';

export const useName = () => {
  const name2 = ref('名字2');
  const setName2 = (v: any) => {
    name2.value = v;
  };
  return {
    name2,
    setName2,
  };
};

export const useNumToSum = () => {

  const sumState = reactive({
    num1: 1,
    num2: 1,
    sum: 0,
    setSum: (v1: number, v2: number) => { },
    toSum: () => { },
  });
  sumState.sum = sumState.num1 + sumState.num2;

  sumState.setSum = (v1: number, v2: number) => {
    sumState.num1 = v1;
    sumState.num2 = v2;
  };

  sumState.toSum = () => {
    sumState.sum = sumState.num1 + sumState.num2;
  };

  return sumState;
};

function useWindowResize() {
  const width = ref(0);
  const height = ref(0);

  function onResize() {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
  }

  onMounted(() => {
    window.addEventListener('resize', onResize);
    onResize();
  });

  onUnmounted(() => {
    window.removeEventListener('resize', onResize);
  });

  return {
    width,
    height,
  };
}

export default defineComponent({
  name: 'HooksCase',
  setup(props, content) {
    // 定义了一个 ref 对象
    const count = ref(10);
    const name = ref('张三');
    const setName = (v: any) => {
      name.value = v;
    };
    const text = ref<string>('hello');
    // 定义了一个依赖 name.value 的计算属性
    const message = computed(() => {
      return `hello, my name is ${text.value}`;
    });

    // const { num1, num2, sum, setSum, toSum } = useNumToSum(); //解构会丢失响应
    // 在不丢失响应式的前提下toRef和toRefs可以将reactive对象解构
    const sumState = useNumToSum();
    const { name2, setName2 } = useName();
    const { width, height } = useWindowResize();
    return {
      text,
      message,
      count,
      doubleCount: () => {
        // 值得注意在setup里面需要使用.value来访问
        count.value *= 2;
      },
      name,
      setName,
      name2,
      setName2,
      sumState,
      width,
      height,
      // username,
    };
  },
  render() {
    return (
      <Fragment>
        {/* <h2>vue中使用hooks</h2>
        <div>
          vue(2.6+)只能在setup内使用(写法依赖于组合式API)
        </div>
        <div>{this.count}</div>
        <Button onClick={this.doubleCount}>乘二</Button>
        <div>---------------------------------</div>
        <h3>setup里写法</h3>
        <div>{this.name}</div>
        <Button style={{ cursor: 'pointer' }} onClick={() => { this.setName('李四'); }}>改变名字</Button>
        <div>---------------------------------</div>
        <h3>自定义hook</h3>
        <div>{this.name2}</div>
        <Button style={{ cursor: 'pointer' }} onClick={() => { this.setName2('王五'); }}>改变名字</Button>
        <div>{this.sumState.num1} + {this.sumState.num2}</div>
        <Button style={{ cursor: 'pointer' }} onClick={() => {
          this.sumState.setSum(Mock.mock({ 'num|1-10': 1 }).num, Mock.mock({ 'num|1-10': 1 }).num);
        }}>更新加数</Button>
        <Button style={{ cursor: 'pointer' }} onClick={() => {
          this.sumState.toSum();
        }}>求和:{this.sumState.sum}</Button>
        <div>---------------------------------</div>
        <h3>监听屏幕尺寸</h3>
        <div>宽度：{this.width}</div>
        <div>高度：{this.height}</div> */}
        {/* <mySwiper/> */}
      </Fragment >
    );
  },
});

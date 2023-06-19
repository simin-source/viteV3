import protobuf from 'protobufjs';
import { Fragment } from 'vue';

const demo = reactive({
  name: '小王',
  soulmate: {
    name: '',
    work: {
      type: '程序员',
      address: '七宝',
    },
  },
});

// protobuf.load('hello.proto', (err, root: any) => {
//   if (err) throw err;

//   const helloMessage = root.lookupType('webflow.HelloWorld');
//   const payload = {
//     name: 'https://www.centmap.com',
//     cookie: 'csm',
//     browser: 'baidu',
//   };
  //   const message1 = helloMessage.create(payload);
  //   const buffer = helloMessage.encode(message1).finish();
  //   const message2 = helloMessage.decode(buffer);
  //   const object = helloMessage.toObject(message2);

  //   console.log(message1);
  //   console.log(message2);
  //   console.log(buffer);
  //   console.log(object);
  //   navigator.sendBeacon('/log', buffer);
  // 结果
  // <Buffer 0a 05 48 65 6c 6c 6f>
  // { message: 'Hello' }
// });

// protobuf.load('analysis.proto', (err, root: any) => {
//   if (err) throw err;

//   const analysisData = root.lookupType('form.Analysis');
//   const payload = {
//     domain: 'https://www.centmap.com',
//     token: 'csm',
//     page: '/#test',
//     referrer: '',
//   };
//     const message1 = analysisData.create(payload);
//     const buffer = analysisData.encode(message1).finish();
    // const message2 = analysisData.decode(buffer);
    // const object = analysisData.toObject(message2);
    // console.log(message1);
    // console.log(message2);
    // console.log(buffer);
    // console.log(object);
    // navigator.sendBeacon('https://chenkai-data.centmap.com:8200/analysis.send', buffer);
// });

// function getLevel2domain(url: string) {
//   try {
//     let subdomain = ''
//     const domain = url ? url.split('/') : ''
//     const domainList = domain[2].split('.')
//     const urlItems = []
//     urlItems.unshift(domainList.pop())
//     while (urlItems.length < 2) {
//       urlItems.unshift(domainList.pop())
//       subdomain = urlItems.join('.')
//     }
//     return subdomain
//   } catch (e) {
//     return ''
//   }
// }

// console.log(getLevel2domain('https://www.abc.zhihu.com/hot/1234'));

export default defineComponent({
  name: 'WatchCase',
  data() {
    return {
      year: '2021',
      people: {
        name: '小美',
        work: '在职',
      },
    };
  },
  watch: {
    // // vue2写法，这种写法不能监听除了data之外的变量
    // year(value) {
    //   // 基本用法
    //   console.log(value);
    // },
    // people: {
    //   handler(value) {
    //     console.log(value);
    //   },
    //   deep: true, // 会监听孙属性，曾孙属性
    // },
  },
  mounted() {
    // watch(demo, newValue => {
    //   // 推荐这种，vue3写法支持使用多个watch函数组合使用
    //   //监听整个对象,孙属性变更也会触发
    //   console.log(newValue);
    // });
    // watch(() => demo.name, newValue => {
    //   //注意:此时的watch第一个参数是一个箭头函数。
    //   //监听对象中的某个属性
    //   console.log(newValue);
    // });
    // watch(() => ({ ...demo }), newValue => {
    //   //监听对象中的子属性，孙属性变更不会触发
    //   console.log(newValue);
    // });
    // watch(() => demo, newValue => {
    //   //监听对象中的所有属性，作用和第一种监听整个对象一样
    //   console.log(newValue);
    // }, { deep: true });
    // watch(demo.soulmate, newValue => {
    //   //监听整个对象,孙属性变更也会触发
    //   console.log(newValue);
    // });
    watch([() => this.year, demo], ([v1, v2], [oldName, oldNums]) => {
      //注意:此时的第一个参数是一个数组
      //组合监听,监听对象中的所有属性
      console.log(v1);
      console.log(v2);
    });
  },
  render() {
    return (
      <Fragment>
        <h2>watch监听器的几种写法</h2>
        <div onClick={() => {
          this.year = '2022';
          // this.people.name = '小帅';
          // this.people = {
          //   name: '小张',
          //   work: '入职',
          // };
          // demo.name = '前段小伙';
          // demo.soulmate.name = 'jack';
          // demo.soulmate = {
          //   name: 'lily',
          //   work: {},
          // };
          demo.soulmate.work.address = '闵行';
        }}>更新</div>
      </Fragment >
    );
  },
});

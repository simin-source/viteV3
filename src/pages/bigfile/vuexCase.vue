<template>
  <div class="content">
    <h2>响应式</h2>
    <div>
      大文件不能直接访问reactive深复制的对象state，需要通过setup转换成ref响应对象
    </div>
    <div>
      setup返回该对象的属性property以及传递给setup的props参数中的property，使其在模板中访问到
    </div>
    <div>{{ foo }}</div>
    <div>{{ apple }}</div>
    <div>{{ count }}</div>
    <button class="btn" @click="add">加</button>
    <button class="btn" @click="reduce">减</button>
    <a href="https://blog.csdn.net/Ajekseg/article/details/123304898"
      >大文件组合式写法</a
    >
    <!-- <drop buttonTitle="立即叫车" @buttonFuc="bookCar">
      <template v-slot:drop-top> drop头部 </template>
      <template v-slot:drop-content> drop内容 </template>
    </drop> -->
  </div>
</template>
<script lang="ts">
import { reactive, ref, toRef, toRefs } from "vue";
import dropContent from "@/components/drop/dropContent.vue";

//响应式
const state = reactive({
  foo: "foo",
});

export default {
  components: { drop: dropContent },
  setup(props, content) {
    // props, content,返回对象
    // const count = ref<string | number>(1); //创建指定变量
    const count = ref<number>(1); //创建指定变量
    const fooRef = toRef(state, "foo");
    const { foo } = toRefs(state);
    // foo.value = 123;
    // fooRef.value = "qqq";
    // bar.value = 9;
    // console.log(content);
    
    return {
      //返回对象可以是变量、函数
      count,
      foo,
      fooRef,
    };
  },
  methods: {
    add() {
      this.count++;
    },
    reduce() {
      this.count--;
    },
    bookCar() {
      console.log("预约车位");
    },
  },
};
</script>

<style lang="scss" scoped type="text/css">
.content {
  width: 100%;
  height: 100%;

  .btn {
    width: 80px;
    padding: 3px 5px;
    background: pink;
    border: 0;
    border-radius: 3px;
  }
}
</style>

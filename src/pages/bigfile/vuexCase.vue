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
    <drop buttonTitle="立即叫车" @buttonFuc="bookCar">
      <template v-slot:drop-top> drop头部 </template>
      <template v-slot:drop-content> drop内容 </template>
    </drop>
  </div>
  <!-- <div class="day">Day (initial)</div>
  <div class="day light-scheme">Day (changes in light scheme)</div>
  <div class="day dark-scheme">Day (changes in dark scheme)</div>
  <br />

  <div class="night">Night (initial)</div>
  <div class="night light-scheme">Night (changes in light scheme)</div>
  <div class="night dark-scheme">Night (changes in dark scheme)</div> -->
  <div class="box">
    <div class="a1">1</div>
    <div class="a2">2</div>
    <div class="a3">3</div>
  </div>
  <div class="vedio_test">
    <img src="@/assets/phone.png" />
    <video id="video1" autoplay muted src="@/assets/taikoohui.mp4"></video>
    <!-- 静音模式下自动播放https://www.jianshu.com/p/bb8a79f68822 -->
    <div class="button" @click="play">开</div>
  </div>
</template>
<script lang="ts">
import { reactive, ref, toRef, toRefs } from "vue";
import dropContent from "@/components/drop/dropContent.vue";
import axios from "axios";

//响应式变量，返回proxy对象
const state = reactive({
  foo: "foo",
});

export default {
  components: { drop: dropContent },
  setup(props, content) {
    // props, content,返回对象
    // const count = ref<string | number>(1); //创建指定变量
    const count = ref<number>(1); //创建指定变量ref 接收参数并将其包裹在一个带有 value property 的对象中返回
    const fooRef = toRef(state, "foo");
    const { foo } = toRefs(state);
    // foo.value = 123;
    // fooRef.value = "qqq";
    // bar.value = 9;
    // console.log(content);

    // context.expose({});

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
    play() {
      let vedioDom = document.getElementById("video1") as any;
      if (vedioDom.paused === true) {
        vedioDom.play();
      } else {
        vedioDom.pause();
      }
    },
  },
};
/**
 * <script setup>
import { computed, ref } from 'vue'
// 定义了一个 ref 对象
const name = ref('')
// 定义了一个依赖 name.value 的计算属性
const message = computed(() => {
  return `hello, my name is ${name.value}`
})
 */
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
.day {
  background: #eee;
  color: black;
}
.night {
  background: #333;
  color: white;
}

.vedio_test {
  position: relative;
  margin: 0 auto;
  width: 220px;
  height: 468px;

  img {
    width: 220px;
    height: 468px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
  }

  video {
    width: 220px;
    height: 468px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }

  .button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
    background: pink;
  }
}

.box {
  width: 100%;
  height: 100px;
  margin: 0 auto;
  border: 1px solid #ff6700;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: space-between;
  background: #eee;
}
.box div {
  width: 30%;
  height: 100px;
  position: absolute;
}

.a1 {
  background: red;
  left: 0;
  animation: loop 10s linear infinite;
}
.a2 {
  background: green;
  left: 30%;
  // animation: loop 10s 4.6s linear infinite;
}
.a3 {
  background: pink;
  left: 60%;
  // animation: loop 10s 4.6s linear infinite;
}

@keyframes loop {
  0% {
    left: 100%;
  }
  100% {
    left: -100%;
  }
}

@media (prefers-color-scheme: dark) {
  .day.dark-scheme {
    background: #333;
    color: white;
  }
  .night.dark-scheme {
    background: black;
    color: #ddd;
  }
}

@media (prefers-color-scheme: light) {
  .day.light-scheme {
    background: white;
    color: #555;
  }
  .night.light-scheme {
    background: #eee;
    color: black;
  }
}
.day,
.night {
  display: inline-block;
  padding: 1em;
  width: 7em;
  height: 2em;
  vertical-align: middle;
}
</style>

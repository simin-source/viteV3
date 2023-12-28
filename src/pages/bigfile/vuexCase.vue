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
    <a href="https://blog.csdn.net/Ajekseg/article/details/123304898">大文件组合式写法</a>
  </div>
  <!-- <div class="box">
    <div class="a1">1</div>
    <div class="a2">2</div>
    <div class="a3">3</div>
  </div> -->
  <!-- <div class="vedio_test">
    <img src="@/assets/phone.png" />
    <video id="video1" autoplay muted src="@/assets/taikoohui.mp4"></video> -->
    <!-- 静音模式下自动播放https://www.jianshu.com/p/bb8a79f68822 -->
    <!-- <div class="button" @click="play">开</div>
  </div> -->
  <MyTable/>
</template>
<script lang="ts" setup>
import { reactive, ref, toRef, toRefs } from "vue";
import MyTable from '@/components/myTable/myTable.vue';
//响应式变量，返回proxy对象
const state = reactive({
  foo: "foo1",
});
const fooRef = toRef(state, "foo");
const { foo } = toRefs(state);
console.log(foo, fooRef);

function play() {
  const vedioDom = document.getElementById("video1") as any;
  if (vedioDom.paused === true) {
    vedioDom.play();
  } else {
    vedioDom.pause();
  }
}
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

</style>

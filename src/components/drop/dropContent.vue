<template>
  <div class="content">
    <div class="drop">
      <slot name="drop-top"></slot>
      <div class="input-order">
        <slot name="drop-content"></slot>
      </div>
    </div>
    <div class="book-button" @click="handleButton">{{ buttonTitle }}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    buttonTitle: {
      type: String,
      required: true,
    },
  },
  emits: ["buttonFuc"],
  methods: {
    handleButton: function () {
      this.$emit("buttonFuc");
    },
  },
};
</script>
<style lang="scss" scoped type="text/css">
.content {
  width: 94%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;

  .drop {
    width: 94%;
    height: 260px;
    background: rgba(0, 0, 0, 0.9);
    border-radius: 10px;
    box-shadow: 0px 5px 5px #333;
    padding: 10px;
    margin-bottom: 10px;

    .input-order {
      width: 96%;
      height: 240px;
      margin: 0 auto;
    }
  }

  .book-button {
    width: 94%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: orange;
    background: rgba(0, 0, 0, 0.9);
    box-shadow: 0px 5px 5px #333;
    border-radius: 10px;
    margin: 10px auto;
  }
}
</style>

export default defineComponent({
  name: 'HooksCase',
  data() {
    return {
      year: '2021',
      people: {
        name: '小美',
        work: '在职',
      },
    };
  },

  mounted() {
  },
  render() {
    return (
      <template>
        <h2>hooks练习</h2>
      </template >
    );
  },
});

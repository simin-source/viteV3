import { defineComponent, onMounted, ref, toRef, toRefs, watch, Fragment } from 'vue';

export function useUserRepositories(user: any) {
    const newUser = ref('');
    const getUser = () => {
        newUser.value = '小笑';
    };

    onMounted(getUser);
    watch(user, getUser);

    return {
        newUser,
        getUser,
    };
}

export default defineComponent({
  name: 'SetupCase',
    data() {
        return {
            count: 1,
        };
    },
    props: {
        user: { //只读
            type: String,
            required: true,
        },
    },
    setup(props, content) {
        // console.log(props);
        // console.log(content);
        const { user } = toRefs(props);
        const text = ref<string>('hello');
        const { newUser } = useUserRepositories(text);
        return {
            //返回对象可以是变量、函数
            text,
            newUser,
        };

    },
    render() {
        return <Fragment>
            <h2>组合式案例</h2>
            <div>简之，采用setup，脱离data，methods的新写法，提供watch函数</div>
            <div>{this.text}</div>
            <div>{this.user}</div>
            <div>{this.count}</div>
            <div>{this.newUser}</div>
            <button onClick={() => { this.count++; this.text = '小强'; }}>加</button>
        </Fragment >;
    },
});
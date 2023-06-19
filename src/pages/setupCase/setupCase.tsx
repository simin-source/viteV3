import { Fragment } from 'vue';
import { ElForm, ElFormItem, ElInput, ElButton} from 'element-plus';
import 'element-plus/es/components/form/style/css'
import 'element-plus/es/components/form-item/style/css'
import 'element-plus/es/components/input/style/css'
import 'element-plus/es/components/button/style/css'
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
function validateName(rule: any, value: any, callback: any) {
    if (value === '') {
        callback(new Error('请输入账号'));
    }
};

function validatePass(rule: any, value: any, callback: any) {
    if (value === '') {
        callback(new Error('请输入密码'));
    }
};

const formRules = {
    name: [
        { validator: validateName, required: true, trigger: 'blur', message: '请输入账号', },// required: false默认情况下是不带*
    ],
    password: [
        { validator: validatePass, required: true, trigger: 'blur', message: '请输入密码', },// required: true默认情况下是带*
    ],
};

export default defineComponent({
    name: 'SetupCase',
    data() {
        return {
            count: 1,
            userForm: {
                name: '',
                password: ''
            },
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
        // onMounted(() => {
        //     // @ts-ignore
        //     window.cmapload = map => {
        //         const Cmap = map.init('map-container', {
        //             mapSource: 'https://tst-data.centmap.com:8443/mapres/449174', // 地图数据地址
        //             defaultControl: false, // 默认控件
        //             angle: 10, // [0, 360]; 地图旋转角度
        //             zoom: 0.62, // 地图初始缩放级别
        //             pitch: 60, // [0, 60]; 地图俯仰角度
        //             zooms: [0.05, 10], // [0.04, 11]; 地图缩放范围
        //             stdZoom: 0.05,
        //         });
        //     };
        //     // @ts-ignore
        //     import('@/assets/main.dart.js');
        // });

        return {
            //返回对象可以是变量、函数
            text,
            newUser,
        };
        // return () => <div id="map-container" style={{ width: '100%', height: '600px', background: 'pink' }}></div>
    },
    methods: {
        submit() {
            this.$refs.formLogin.validate((valid) => {
                console.log(valid);
                if (valid) {
                    console.log('submit!')
                } else {
                    console.log('error submit!')
                    return false
                }
            });
        }
    },
    render() {
        return <Fragment>
            {/* <div id="map-container" style={{ width: '100%', height: '600px', background: 'pink' }}></div> */}
            <h2>组合式案例</h2>
            <div>简之，采用setup，脱离data，methods的新写法，提供watch函数</div>
            <div>{this.text}</div>
            <div>{this.user}</div>
            <div>{this.count}</div>
            <div>{this.newUser}</div>
            <button onClick={() => { this.count++; this.text = '小强'; }}>加</button>
            <ElForm ref='formLogin' model={this.userForm} rules={formRules}>
                <ElFormItem prop='name'>
                    <ElInput v-model={this.userForm.name} placeholder="请填写账号" />
                </ElFormItem>
                <ElFormItem prop='password'>
                    <ElInput
                        v-model={this.userForm.password}
                        type="password"
                        placeholder="请输出密码"
                        show-password
                    />
                </ElFormItem>
                <ElButton type="primary" onClick={this.submit} >登录</ElButton>
            </ElForm>
        </Fragment >;
    },
});
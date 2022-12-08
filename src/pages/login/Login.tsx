import { routerFactory } from '@/router/router';
import styles from './Login.module.scss';
export default defineComponent({
    name: 'Login',
    data() {
        return {
            options: [
                {
                    value: '主人',
                    label: '主人',
                }, {
                    value: '游客',
                    label: '游客',
                },
            ],
            role: '',
        }
    },
    methods: {
        getRoute(role: string) {
            let routerObj = routerFactory(role);
            this.$router.addRoute(routerObj.route);
            this.$router.push({ name: routerObj.name })
            console.log(this.$router.options);
        }
    },
    render() {
        return <div class={styles.content}>
            <ElSelect v-model={this.role} filterable placeholder='选择身份'>
                {this.options.map(item => {
                    return <ElOption key={item.value} label={item.label} value={item.value} />
                })}
            </ElSelect>
            <ElButton type="primary" style={{marginTop:'20px'}} onClick={() => this.getRoute(this.role)}> 进入</ElButton>
        </div>;
    },
});
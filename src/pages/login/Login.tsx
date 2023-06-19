import { ElButton, ElOption, ElSelect } from 'element-plus';
import 'element-plus/es/components/select/style/css'
import 'element-plus/es/components/option/style/css'
import 'element-plus/es/components/button/style/css'
import styles from './Login.module.scss';
import { userManager } from '@/store/user';
import { Fragment } from 'vue';
// import DBSCAN from 'dbscanjs';
const dataset = [
    [1, 2], [1, 3], [2, 2], [4, 3],
    [9, 10], [10, 10], [10, 9], [7, 8]
  ];
//   console.log(DBSCAN);
  
//   // 创建一个 DBSCAN 实例
//   const dbscan = new DBSCAN();
  
//   // 进行聚类操作
//   const clusters = dbscan.run(dataset, 1, 2);
  
//   console.log(clusters);
export default defineComponent({
    name: 'Login',
    data() {
        return {
            roleId: '' as any,
        }
    },
    render() {
        return <Fragment>
            <div class={styles.content}>
                <ElSelect v-model={this.roleId} filterable placeholder='选择身份'>
                    {userManager.roleList.map(item => {
                        return <ElOption key={item.value} label={item.label} value={item.value} />
                    })}
                </ElSelect>
                <ElButton type="primary" style={{ marginTop: '20px' }}
                    onClick={() => {
                        userManager.login(this.roleId)
                    }}
                > 进入</ElButton>
            </div>
            <div class={styles.bg}></div>
        </Fragment>;
    },
});
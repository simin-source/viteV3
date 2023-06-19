import { userManager } from '@/store/user';
import { ElMenu } from 'element-plus';
import 'element-plus/es/components/menu/style/css';
import { Fragment } from 'vue';
import style from './Navbar.module.scss';
import NavbarItem from './navbarItem/NavbarItem';
export default defineComponent({
    name: 'Navbar',
    render() {
        return <Fragment>
            <ElMenu
                class={style.menuOver}
                mode="horizontal"
                popper-effect="light"
            >
                {userManager.applyActions?.map(route => {
                    return <NavbarItem key={route.path} item={route} basePath={route.path} />;
                })}
            </ElMenu>
        </Fragment>;
    },
});

import { RouteRecordRaw } from 'vue-router';
import NavbarItem from './navbarItem/NavbarItem';
import { ElMenu } from 'element-plus';
import { menuOver } from './Navbar.module.scss';
import { userManager } from '@/store/user';

export default defineComponent({
    setup() {
        const routes: RouteRecordRaw[] = userManager.applyActions;

        return () => (
            <ElMenu
                class={menuOver}
                mode="horizontal"
                popper-effect="light"
            >
                {routes?.map((item: RouteRecordRaw) => {
                    return <NavbarItem to={item.path} items={item.children} >
                        {/* Slot for recursive content */}
                        <span>{item?.meta?.title ? item?.meta?.title : item.name}</span>
                    </NavbarItem>;
                })}

            </ElMenu>
            // <nav>
            //     <ul>
            //         {routes.map((item: RouteRecordRaw) => {
            //             return <NavbarItem to={item.path} items={item.children} >
            //                 {/* Slot for recursive content */}
            //                 <span>{item?.meta?.name ? item?.meta?.name : item.name}</span>
            //             </NavbarItem>;
            //         })}
            //     </ul>
            // </nav>
        );
    },
});
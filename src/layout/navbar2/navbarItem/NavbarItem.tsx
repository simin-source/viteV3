import NavbarItem from '../navbarItem/NavbarItem';
import { PropType } from "vue";
import { RouteRecordRaw } from "vue-router";
import { ElMenuItem, ElSubMenu } from 'element-plus';

export default defineComponent({
    name: 'NavbarItem',
    props: {
        to: {
            type: String,
            required: true,
        },
        items: {
            type: Object as PropType<RouteRecordRaw[]>,
        },
    },
    setup(props, { slots }) {
        const { to, items } = props;

        return () => (
            <ElMenuItem index={to}>
                {items && items.length > 0 ? <ElSubMenu class="sub_item" index={to}
                    v-slots={{
                        title: () => slots.default ? slots.default() : 'Navbar Item',
                    }}>
                    {items?.map((item: any) => {
                        return <NavbarItem to={item.path} items={item.children}>
                            {/* Recursive call to render nested items */}
                            {item.meta.title}
                        </NavbarItem>;
                    })}
                </ElSubMenu> : <ElMenuItem index={to}>
                    <router-link style={{ textDecoration: 'none', width: '100%', color: '#000' }} to={to}>
                        {slots.default ? slots.default() : 'Navbar Item'}
                    </router-link>
                </ElMenuItem>}
            </ElMenuItem>
            // <li>
            //     {items ? <ul>
            //         {items.map((item: any) => (
            //             <NavbarItem to={item.path} items={item.children}>
            //                 {/* Recursive call to render nested items */}
            //                 {item.meta.title}
            //             </NavbarItem>
            //         ))}
            //     </ul> :
            //         <router-link style={{ textDecoration: 'none', width: '100%', color: '#000' }} to={to}>{
            //             slots.default ? slots.default() : 'Navbar Item'
            //         }</router-link>
            //     }
            // </li>
        );
    },
});
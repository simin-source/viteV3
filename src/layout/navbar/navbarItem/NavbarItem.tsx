import { Fragment } from '@vue/runtime-dom';
import { ElMenuItem, ElSubMenu } from 'element-plus';
import 'element-plus/es/components/menu-item/style/css';
import 'element-plus/es/components/sub-menu/style/css';
import NavbarItem from '../navbarItem/NavbarItem';
export default defineComponent({
    name: 'NavbarItem',
    data() {
        return {
        };
    },
    props: {
        item: {
            type: Object,
            required: true,
        },
        basePath: {
            type: String,
            default: '',
        },
    },
    render() {
        return <Fragment>
            {this.item.children ?
                <ElMenuItem index={this.item.path}>
                    {this.item.meta.title}
                    <ElSubMenu class="sub_item" index={this.item.path}>
                        {this.item.children?.map((route: any) => {
                            return <NavbarItem key={route.path} item={route} basePath={route.path} />;
                        })}
                    </ElSubMenu>
                </ElMenuItem> :
                <ElMenuItem index={this.item.path}>
                    <router-link style={{textDecoration: 'none', width: '100%', color: '#000'}} to={this.item.path}>{this.item.meta.title}</router-link>
                </ElMenuItem>
            }
        </Fragment>;
    },
});
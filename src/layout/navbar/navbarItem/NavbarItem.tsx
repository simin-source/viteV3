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
    mounted() {

    },
    render() {
        return <tem>
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
        </tem>;
    },
});
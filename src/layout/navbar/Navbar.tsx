import style from './Navbar.module.scss';
import NavbarItem from './navbarItem/NavbarItem';
export default defineComponent({
    name: 'Navbar',
    data() {
        return {
        };
    },
    computed: {
        routes() {
            const secondRoutes = this.$router.currentRoute.value.matched[0].children;
            return secondRoutes;
        },
        activeMenu() {
            const { meta, path } = this.$route;
            if (meta.activeMenu) {
                return meta.activeMenu;
            }
            return path;
        },
    },
    methods: {
    },
    render() {
        return <template>
            <ElMenu
                default-active={this.activeMenu}
                class={style.menuOver}
                mode="horizontal"
                popper-effect="light"
            >
                {this.routes?.map(route => {
                    return <NavbarItem key={route.path} item={route} basePath={route.path} />;
                })}
            </ElMenu>
        </template>;
    },
});

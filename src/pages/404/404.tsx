import { Fragment } from "vue";

export default defineComponent({
    name: '404',
    render() {
        return <Fragment>
            <h2>404</h2>
            <a href="/#/login">返回</a>
        </Fragment>;
    },
});
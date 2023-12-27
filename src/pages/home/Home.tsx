import Navbar from '@/layout/navbar2/Navbar';
// import Navbar from '@/layout/navbar/Navbar';
import { Fragment, defineComponent } from 'vue';
import { RouterView } from 'vue-router';
/*
主布局文件
*/
export default defineComponent({
    name: 'Home',
    render() {
        return <Fragment>
            <Navbar />
            <RouterView />
        </Fragment>;
    },
});
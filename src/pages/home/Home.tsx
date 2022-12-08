import Navbar from '@/layout/navbar/Navbar';
import { RouterView } from 'vue-router';
/*
主布局文件
*/
export default defineComponent({
    name: 'Home',
    render() {
        return <div>
            <Navbar />
            <RouterView />
        </div>;
    },
});
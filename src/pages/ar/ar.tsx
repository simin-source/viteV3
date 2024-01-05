import { Fragment } from "vue";
import { scene } from '@/store';
import Object3D from "@/utils/object3D";

export default defineComponent({
    name: 'ar',
    data() {
        return {
            object3d: {} as any,
        };
    },
    mounted() {
        // console.log(scene.footer);
        this.object3d = new Object3D('canvs');
        this.object3d.init();
        this.testWebXR();
    },
    methods: {
        testWebXR() {
            if ("xr" in window.navigator) {
                /* WebXR can be used! */
                console.log('WebXR can be used');
            } else {
                /* WebXR isn't available */
                console.log("WebXR isn't available");
            }
        },
    },
    render() {
        return <Fragment>
            <h2>ar</h2>
            <div id="canvs" style={{ width: '100%', height: '700px' }}></div>
        </Fragment >;
    },
});
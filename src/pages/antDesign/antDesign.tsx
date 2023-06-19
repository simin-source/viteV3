import 'ant-design-vue/lib/grid/style';
import { Row, Col, Button } from "ant-design-vue";
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'AntDesign',
    render() {
        return <div>
            <h2>antdesign-vue</h2>
            <Row>
                <Col span={12}>col-12</Col>
                <Col span={12}>col-12</Col>
            </Row>
        </div>;
    },
});
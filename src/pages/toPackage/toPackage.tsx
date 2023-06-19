import axios from 'axios';
import { defineComponent, Fragment } from 'vue';
import { btn1, btn2, btnGroup, contianer } from './toPackage.module.scss';
interface FileType {
  file_name: string;
  env: number;
  project: string;
}

export default defineComponent({
  name: 'ToPackage',
  data() {
    return {
      packageInfo: {
        file_name: 'dist123.zip',
        env: 8443,
        project: 'fengxian',
      } as FileType,
    };
  },
  created() { },
  methods: {
    fileInfo(e: any) {
      // 获取input标签选择的文件,并选择第一条
      const resultFile = e.target.files[0];
      // 如果文件存在
      if (resultFile) {
        // 使用 FileReader 来读取文件
        const reader = new FileReader();
        // 获取文件名
        reader.readAsArrayBuffer(resultFile);
        // 读取文件,会触发 onload 异步事件,可使用回调函数 来获取最终的值.
        reader.onload = () => {
          const buffer = reader.result;
          // 若为回调函数,则触发回调事件
          if (buffer && buffer instanceof ArrayBuffer) {
            //执行上传
            axios({
              method: 'POST', // 默认都是post请求
              url: `https://tst-app.centmap.com:8443/wuyue/datong/serv/upload.file/${resultFile.name}`,
              data: buffer,
            }).then(res => {
              console.log(res.data.filename);
              if (res) {
                this.packageInfo.file_name = res.data.filename;
              }
            });
          }
        };
        e.target.value = ''; //清空input的值
      }
    },
    publish(data: FileType) {
      if (!data.file_name) return;
      axios({
        method: 'POST', // 默认都是post请求
        url: 'https://tst-app.centmap.com:8443/wuyue/datong/serv/upload.publish',
        data,
      }).then(res => {
        console.log(res);
      });
    },
  },
  render() {
    return (
      <Fragment>
        <div class={contianer}>
          <h2>打包发布</h2>
          <input
            type="file"
            id="btn_file"
            accept=".zip"
            onChange={this.fileInfo}
          />
          <div class={btnGroup}>
            <bttton class={btn1} onclick={() => {
              this.packageInfo.env = 8443;
              this.packageInfo.project = 'fengxian';
              this.publish(this.packageInfo);
            }}>发布丰县H5测服8443</bttton>
            {/* <bttton class={btn2} onclick={() => {
              this.packageInfo.env = 443;
              this.packageInfo.project = 'fengxian';
              this.publish(this.packageInfo);
            }}>发布丰县H5正服443</bttton> */}
          </div>
          <div class={btnGroup}>
            <bttton class={btn1} onclick={() => {
              this.packageInfo.env = 8443;
              this.packageInfo.project = 'chongqing';
              this.publish(this.packageInfo);
            }}>发布重庆H5测服8443</bttton>
            {/* <bttton class={btn2} onclick={() => {
              this.packageInfo.env = 443;
              this.packageInfo.project = 'fengxian';
              this.publish(this.packageInfo);
            }}>发布重庆H5正服443</bttton> */}
          </div>
          <div class={btnGroup}>
            <bttton class={btn1} onclick={() => {
              this.packageInfo.env = 8443;
              this.packageInfo.project = 'datong';
              this.publish(this.packageInfo);
            }}>发布大同H5测服8443</bttton>
            {/* <bttton class={btn2} onclick={() => {
              this.packageInfo.env = 443;
              this.packageInfo.project = 'datong';
              this.publish(this.packageInfo);
            }}>发布大同H5正服443</bttton> */}
          </div>
          <div class={btnGroup}>
            <bttton class={btn1} onclick={() => {
              this.packageInfo.env = 8443;
              this.packageInfo.project = 'campus';
              this.publish(this.packageInfo);
            }}>发布园区官网测服8443</bttton>
            <bttton class={btn2} onclick={() => {
              this.packageInfo.env = 443;
              this.packageInfo.project = 'campus';
              this.publish(this.packageInfo);
            }}>发布园区官网正服443</bttton>
          </div>
          {/* <div class={btnGroup}>
            <bttton class={btn1} onclick={() => {
              this.packageInfo.env = 8443;
              this.packageInfo.project = 'hongfeng';
              this.publish(this.packageInfo);
            }}>发布宏沣官网测服8443</bttton>
            <bttton class={btn2} onclick={() => {
              this.packageInfo.env = 443;
              this.packageInfo.project = 'hongfeng';
              this.publish(this.packageInfo);
            }}>发布宏沣官网正服443</bttton>
          </div> */}
          {/* <div class={btnGroup}>
            <bttton class={btn1} onclick={() => {
              this.packageInfo.env = 8443;
              this.packageInfo.project = 'biovillage';
              this.publish(this.packageInfo);
            }}>发布康辉后台测服8443</bttton>
            <bttton class={btn2} onclick={() => {
              this.packageInfo.env = 443;
              this.packageInfo.project = 'biovillage';
              this.publish(this.packageInfo);
            }}>发布康辉后台正服443</bttton>
          </div> */}
          <div class={btnGroup}>
            <bttton class={btn1} onclick={() => {
              this.packageInfo.env = 8443;
              this.packageInfo.project = 'tst-app-coll';
              this.publish(this.packageInfo);
            }}>发布tst-app-coll测服8443</bttton>
            <bttton class={btn2} onclick={() => {
              this.packageInfo.env = 443;
              this.packageInfo.project = 'tst-app-coll';
              this.publish(this.packageInfo);
            }}>发布tst-app-coll正服443</bttton>
          </div>
          <div class={btnGroup}>
            <bttton class={btn1} onclick={() => {
              this.packageInfo.env = 8443;
              this.packageInfo.project = 'tool-coll';
              // 发布采集数据
              this.publish(this.packageInfo);
            }}>发布tool-coll测服8443</bttton>
            <bttton class={btn2} onclick={() => {
              this.packageInfo.env = 443;
              this.packageInfo.project = 'tool-coll';
              this.publish(this.packageInfo);
            }}>发布tool-coll正服443</bttton>
          </div>
          <div class={btnGroup}>
            <bttton class={btn1} onclick={() => {
              this.packageInfo.env = 8443;
              this.packageInfo.project = 'analysis';
              this.publish(this.packageInfo);
            }}>发布大同吴悦流量分析平台测服8443</bttton>
            <bttton class={btn2} onclick={() => {
              this.packageInfo.env = 443;
              this.packageInfo.project = 'analysis';
              this.publish(this.packageInfo);
            }}>发布大同吴悦流量分析平台l正服443</bttton>
          </div>
          <div class={btnGroup}>
            <bttton class={btn1} onclick={() => {
              this.packageInfo.env = 8443;
              this.packageInfo.project = 'tst-official';
              this.publish(this.packageInfo);
            }}>发布centmap官网测服8443</bttton>
          </div>
        </div>
      </Fragment>
    );
  },
});

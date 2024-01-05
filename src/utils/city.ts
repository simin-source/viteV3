import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

const fbxLoader = new FBXLoader();
export const loadFBX = (url: string) => {
  return new Promise(((resolve, reject) => {
    fbxLoader.load(url, (object: any) => {
      resolve(object);
    }, () => { }, (error: any) => {
      reject(error);
    });
  }));
};

export class City {
    scene: any;
    camera: any;
    controls: any;

    constructor(scene: any, camera: any, controls: OrbitControls) {
        this.scene = scene;
        this.camera = camera;
        this.controls = controls;
        this.loadCity();
    }

    loadCity() {
        // 加载模型，并渲染到画布上
        loadFBX('./model/beijing.fbx').then(object => {
            // console.log(object);// 返回组对象Group
            this.scene.add(object);
            // 遍历场景中的所有几何体数据
        });
    }
}
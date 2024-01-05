import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { City } from "./city";

class Object3D {
  canvsId: any;
  dom: any;
  scene: any;
  camera: any;
  controls: any;
  light: object = {};
  renderer: any;
  mesh: object = {};

  //材质对象
  material = {
    greenBasic: new THREE.MeshBasicMaterial({
      color: 0x00ff00,
    }),
  };

  constructor(id: any) {
    this.canvsId = id;
  }

  init() {
    this.initScene();
    this.initCamera();
    this.initControl();
    this.initLight();
    this.initRender();
    this.onWindowResize();
    this.initThreeObject();
    const city = new City(this.scene, this.camera, this.controls);
    this.animate();
  }

  initScene() {
    this.dom = document.getElementById(this.canvsId);
    if (this.dom == null) return;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x152540);
  }

  initCamera() {
    // 创建一个相机 视点
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    ); //透射相机
    // 设置相机的位置
    this.camera.position.set(0, 0, 0);
  }

  initControl() {
    this.controls = new OrbitControls(this.camera, this.dom); //轨迹
    // 是否有惯性
    this.controls.enableDamping = true;
    // 是否可以缩放
    this.controls.enableZoom = false; // 采用鼠标滚轮
    // 最近和最远距离
    this.controls.minDistance = 100;
    this.controls.maxDistance = 2000;
    // 开启右键拖动, 处理场景偏移问题
    this.controls.enablePan = true;
  }

  initLight() {
    this.light["ambientLight"] = new THREE.AmbientLight(0xadadad); //环境光
    this.light["directionalLight"] = new THREE.DirectionalLight(0xffffff); //太阳光
    this.light["directionalLight"].position.set(0, 0, 0);
    this.scene.add(toRaw(this.light["ambientLight"]));
    this.scene.add(toRaw(this.light["directionalLight"]));
  }

  initRender() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    this.renderer.autoClear = true;
    this.renderer.setSize(this.dom.clientWidth, this.dom.clientHeight);
    // 像素比（和浏览器一致）
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    // 背景色
    this.renderer.setClearColor(new THREE.Color(0x000000), 1);
    this.dom.appendChild(this.renderer.domElement);
  }

  initThreeObject() {
    this.mesh["tip"] = this.drawTip();
    this.scene.add(toRaw(this.mesh["tip"]));
  }

  drawTip() {
    // const trueTip = new THREE.Mesh();
    // const line1 = new THREE.Mesh(
    //   new THREE.CylinderGeometry(0.04, 0.04, 0.4, 10),
    //   this.material.greenBasic
    // );
    // line1.rotation.z += 0.9;
    // line1.position.set(-0.33, -0.08, 0);
    // const line2 = new THREE.Mesh(
    //   new THREE.CylinderGeometry(0.04, 0.04, 0.6, 10),
    //   this.material.greenBasic
    // );
    // line2.rotation.z -= 0.65;
    // trueTip.add(line1);
    // trueTip.add(line2);
    // trueTip.position.set(0, 0, 0);
    const sphereGeometry = new THREE.SphereGeometry(4, 15, 15);

    const trueTip = new THREE.Mesh(sphereGeometry, this.material.greenBasic);
    return trueTip;
  }

  onWindowResize() {
    window.addEventListener("resize", () => {
      if (this.dom === null) return;
      // 更新宽高比
      this.camera.aspect = this.dom.clientWidth / this.dom.clientHeight;
      // 更新相机的投影矩阵
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(this.dom.clientWidth, this.dom.clientHeight);
      // 设置像素比
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
  }

  animate() {
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this.animate.bind(this));
  }
}

export default Object3D;

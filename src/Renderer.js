import * as THREE from 'three';

export default class Renderer{
    constructor(experience){
        this.experience = experience;
        this.canvas = this.experience.canvas;
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.camera = this.experience.camera;

        this.setInstance();
    }

    setInstance(){
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        });

        // tone mapping
        // this.instance.toneMapping = THREE.ReinhardToneMapping;

        // shadow
        this.instance.shadowMap.enabled = true;
        this.instance.shadowMap.type = THREE.PCFSoftShadowMap;

        this.instance.setClearColor('#211d20', 1);
        this.instance.setSize(this.sizes.width, this.sizes.height);
        this.instance.setPixelRatio(this.sizes.pixelRatio);
    }

    resize(){
        // Update renderer
        this.instance.setSize(this.sizes.width, this.sizes.height);
        this.instance.setPixelRatio(this.sizes.pixelRatio);
    }

    update(){
        this.instance.render(this.scene, this.camera.instance);
    }
}
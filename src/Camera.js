import * as THREE from 'three';
import {OrbitControls} from "three/addons/controls/OrbitControls";

export default class Camera{
    constructor(experience){
        this.experience = experience;
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;

        this.setInstance();
    }

    setInstance(){
        this.instance = new THREE.PerspectiveCamera(75, this.sizes.aspect);
        this.instance.position.set(6, 4, 8);
        this.scene.add(this.instance);
    }

    setOrbitControls(){
        this.controls = new OrbitControls(this.instance, this.canvas);
        this.controls.enableDamping = true;
    }

    resize(){
        this.instance.updateProjectionMatrix();
    }

    update(){
        this.controls.update();
    }
}
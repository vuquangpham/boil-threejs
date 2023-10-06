// deps
import Sizes from "@/Utils/Sizes";
import Time from "@/Utils/Time";
import Camera from '@/Camera';

import * as THREE from 'three';

// helpers
import {validateTarget} from "@/helpers";

const DEV_MODE = true;

export default class Experience{
    constructor(canvas){
        // toggle the experience in window context
        if(DEV_MODE){
            window.experience = this;
        }

        // validate the canvas element
        this.canvas = validateTarget(canvas);
        if(!this.canvas) return;

        // setup
        this.sizes = new Sizes();
        this.time = new Time();
        this.scene = new THREE.Scene();
        this.camera = new Camera(this);

        // resize event
        this.sizes.on('resize', this.resize.bind(this));

        // tick event
        this.time.on('tick', this.update.bind(this));
    }

    /**
     * Resize handler
     * */
    resize(){
        // update the sizes
        this.sizes.resize();

        // update the camera
        this.camera.resize();
    }

    /**
     * Update handler
     * */
    update(){
        // update the camera
        this.camera.update();
    }
}
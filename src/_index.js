// deps
import Sizes from "@/Utils/Sizes";
import Time from "@/Utils/Time";
import Camera from '@/Camera';
import Resources from "@/Utils/Resources";
import Renderer from "@/Renderer";
import World from "@/World/World";

import * as THREE from 'three';

// helpers
import {validateTarget} from "@/helpers";
import sources from '@/sources.js';

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
        this.resources = new Resources(sources);
        this.camera = new Camera(this);
        this.renderer = new Renderer(this);
        this.world = new World(this);

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

        // update the renderer
        this.renderer.resize();
    }

    /**
     * Update handler
     * */
    update(){
        // update the camera
        this.camera.update();

        // world update
        this.world.update();

        // update the renderer
        this.renderer.update();
    }
}
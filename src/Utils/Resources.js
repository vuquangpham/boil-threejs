import * as THREE from 'three';
import {GLTFLoader} from "three/addons/loaders/GLTFLoader";
import EventEmitter from "@/Utils/EventEmitter";

export default class Resources extends EventEmitter{
    constructor(sources){
        super();

        // options
        this.sources = sources;

        // setup
        this.items = {};
        this.toLoadCount = this.sources.length;
        this.loadedCount = 0;

        this.setLoaders();
        this.startLoading();
    }

    setLoaders(){
        this.loaders = {};
        this.loaders.gltfLoader = new GLTFLoader();
        this.loaders.textureLoader = new THREE.TextureLoader();
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader();
    }

    startLoading(){
        // load each source
        this.sources.forEach(source => {
            // default loader is gltfLoader
            let loader = this.loaders.gltfLoader;

            // get the loader
            switch(source.type){
                case 'texture':
                    loader = this.loaders.textureLoader;
                    break;
                case 'cubeTexture':
                    loader = this.loaders.cubeTextureLoader;
                    break;
            }

            // load the resource
            loader.load(source.path, (file) => this.sourceLoaded(source, file));
        });
    }

    sourceLoaded(source, file){
        // assign source to items
        this.items[source.name] = file;

        // increase count
        this.loadedCount++;

        if(this.loadedCount === this.toLoadCount){
            this.trigger('loaded');
        }
    }
}
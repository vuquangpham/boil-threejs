import * as THREE from 'three';
import Environment from "@/World/Environment";
import Floor from "@/World/Floor";
import Fox from "@/World/Fox";
import {exp} from "three/nodes";

export default class World{
    constructor(experience){
        this.experience = experience;
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        /// wait for resources
        this.resources.on('loaded', () => {
            // floor
            this.floor = new Floor(experience);

            // fox
            this.fox = new Fox(experience);

            // load the environment later because of the functionality of the updateMaterials
            // updateMaterials will affect to all the Mesh so it should be the last runner
            this.environment = new Environment(experience);
        });
    }

    update(){
        this.fox?.update();
    }
}
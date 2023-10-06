import * as THREE from 'three';
import Environment from "@/World/Environment";

export default class World{
    constructor(experience){
        this.experience = experience;
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        // test mesh
        const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(4, 4, 4),
            new THREE.MeshStandardMaterial()
        );
        this.scene.add(mesh);

        /// wait for resources
        this.resources.on('loaded', () => {
            // setup
            this.environment = new Environment(experience);
        });
    }
}
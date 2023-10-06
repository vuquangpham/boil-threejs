import * as THREE from 'three';

export default class Fox{
    constructor(experience){
        this.experience = experience;
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;

        this.resource = this.resources.items['foxModel'];

        this.setModel();
        this.setAnimation();
    }

    setModel(){
        this.model = this.resource.scene;
        this.model.scale.set(0.02, 0.02, 0.02);
        this.scene.add(this.model);

        // cast shadow
        this.model.traverse(child => {
            if(child.isMesh && child.material.isMeshStandardMaterial){
                child.castShadow = true;
            }
        });
    }

    setAnimation(){
        this.animation = {};
        this.animation.mixer = new THREE.AnimationMixer(this.model);
        this.animation.action = this.animation.mixer.clipAction(this.resource.animations[2]);
        this.animation.action.play();
    }

    update(){
        this.animation.mixer.update(this.time.delta * 0.001);
    }
}
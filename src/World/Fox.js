import * as THREE from 'three';

export default class Fox{
    constructor(experience){
        this.experience = experience;
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;

        // debug
        this.debug = this.experience.debug;
        if(this.debug.active){
            this.debugFolder = this.debug.gui.addFolder('fox');
        }

        // load resource
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

        this.animation.actions = {};

        this.animation.actions.idle = this.animation.mixer.clipAction(this.resource.animations[0]);
        this.animation.actions.walking = this.animation.mixer.clipAction(this.resource.animations[1]);
        this.animation.actions.running = this.animation.mixer.clipAction(this.resource.animations[2]);

        this.animation.actions.current = this.animation.actions.idle;
        this.animation.actions.current.play();

        this.animation.play = (name) => {
            const newAction = this.animation.actions[name];
            const prevAction = this.animation.actions.current;

            newAction.reset();
            newAction.play();
            newAction.crossFadeFrom(prevAction, 1);

            this.animation.actions.current = newAction;
        };

        // add debug
        if(this.debug.active){
            const debugObject = {
                playIdle: () => this.animation.play('idle'),
                playWalking: () => this.animation.play('walking'),
                playRunning: () => this.animation.play('running'),
            };

            this.debugFolder.add(debugObject, 'playIdle');
            this.debugFolder.add(debugObject, 'playWalking');
            this.debugFolder.add(debugObject, 'playRunning');
        }
    }

    update(){
        this.animation.mixer.update(this.time.delta * 0.001);
    }
}
import * as THREE from 'three';

export default class Environment{
    constructor(experience){
        this.experience = experience;
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        this.setSunLight();
        this.setEnvironmentMap();
    }

    setSunLight(){
        this.sunLight = new THREE.DirectionalLight('#fff', 4);
        this.sunLight.position.set(3, 7, 6);

        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 15;
        this.sunLight.shadow.mapSize.set(1024, 1024);
        this.sunLight.shadow.normalBias = 0.05; // blender object with the shadow acne

        this.scene.add(this.sunLight);
    }

    setEnvironmentMap(){
        this.environtmentMap = {
            intensity: 0.4,
            texture: this.resources.items.environmentMapTexture
        };

        this.environtmentMap.texture.colorSpace = THREE.SRGBColorSpace;
        this.scene.environment = this.environtmentMap.texture;

        // update the materials because the environment map is added after the cube, and we need to update the material
        const updateMaterials = () => {
            this.scene.traverse(child => {
                if(child.isMesh && child.material.isMeshStandardMaterial){
                    child.material.envMap = this.environtmentMap.texture;
                    child.material.envMapIntensity = this.environtmentMap.intensity;
                    child.material.needsUpdate = true;
                }
            });
        };
    }
}
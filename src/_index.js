// deps
import Sizes from "@/Utils/Sizes";

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
        this.sizes.on('resize', this.resize.bind(this));
    }

    resize(){
        this.sizes.update();
    }
}
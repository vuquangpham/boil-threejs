import {debounce} from "@/helpers";
import EventEmitter from "@/Utils/EventEmitter";

export default class Sizes extends EventEmitter{
    constructor(element = undefined, updateWhenResize = true){
        super();

        const width = element?.clientWidth || window.innerWidth;
        const height = element?.clientHeight || window.innerHeight;

        // setup
        this.width = width;
        this.height = height;
        this.pixelRatio = Math.min(window.devicePixelRatio, 2);

        // register resize event
        if(updateWhenResize){
            window.addEventListener('resize', debounce(this.trigger.bind(this, 'resize')));
        }
    }

    update(element){
        const width = element?.clientWidth || window.innerWidth;
        const height = element?.clientHeight || window.innerHeight;

        this.width = width;
        this.height = height;
        this.pixelRatio = Math.min(window.devicePixelRatio, 2);
    }
}
import {debounce} from "@/helpers";
import EventEmitter from "@/Utils/EventEmitter";

export default class Sizes extends EventEmitter{
    constructor(element = undefined, updateWhenResize = true){
        super();

        const {width, height} = this.validateWidthAndHeight(element);

        // setup
        this.width = width;
        this.height = height;
        this.aspect = this.width / this.height;
        this.pixelRatio = Math.min(window.devicePixelRatio, 2);

        // register resize event
        if(updateWhenResize){
            this.handleResize = debounce(this.trigger.bind(this, 'resize'));
            window.addEventListener('resize', this.handleResize);
        }
    }

    validateWidthAndHeight(element){
        return {
            width: element?.clientWidth || window.innerWidth,
            height: element?.clientHeight || window.innerHeight
        };
    }

    resize(element){
        const {width, height} = this.validateWidthAndHeight(element);

        this.width = width;
        this.height = height;
        this.aspect = this.width / this.height;
        this.pixelRatio = Math.min(window.devicePixelRatio, 2);
    }
}
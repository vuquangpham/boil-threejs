import {debounce} from "@/helpers";

export default class Sizes{
    constructor(element = undefined, updateWhenResize = true){
        const width = element?.clientWidth || window.innerWidth;
        const height = element?.clientHeight || window.innerHeight;

        // setup
        this.width = width;
        this.height = height;
        this.pixelRatio = Math.min(window.devicePixelRatio, 2);

        if(updateWhenResize){
            window.addEventListener('resize', debounce(this.update.bind(this, element)));
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
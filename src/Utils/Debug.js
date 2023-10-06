import GUI from "lil-gui";

export default class Debug{
    constructor(){
        this.active = window.location.search === '?debug';
        if(!this.active) return null;

        this.gui = new GUI();
    }
}
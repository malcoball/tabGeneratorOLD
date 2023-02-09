import { scales } from "../../../Data/Music/TabGeneration/scale";
import {synths} from '../../../Tone/synths';
class Button{
    text : string
    func : Function
    name : string

    constructor(text:string,func:Function,name:string){
        this.text = text;
        this.func = func;
        this.name = name;
    }
}
class Slider{
    value : number; valueMin : number; valueMax : number;
    name : string;
    scale : number;
    constructor(value:number,valueMin:number,valueMax:number,name:string, scale:number){
        this.value = value; this.valueMin = valueMin; this.valueMax = valueMax;
        this.name = name;
        this.scale = scale;
    }
}
class DropDown{
    list : string[];
    name : string;
    constructor(list:string[],name:string){
        this.list = list;
        this.name = name;
    }
}
const pushBtn = new Button("New Tab",()=>{console.log("push pls")},'pushButton');

const tabLength     = new Slider(6,0,12,'tabLength',1);
const rootNote      = new Slider(7,0,24,'rootNote',1);
const longestNote   = new Slider(2,0,3,'longestNote',2);
const bpm           = new Slider(150,0,250, 'bpm',1);
const distortion    = new Slider (0,0,10,'distortion',1);
const handPosition  = new Slider(0,0,12,"handPosition",1)

const tabType       = new DropDown(['bass','guitar','banjo','mayo'],'tabType'); // Mayo?
const scale         = new DropDown([],'scale');
scales.forEach(elm => {
    scale.list.push(elm.name);
});
const instrument    = new DropDown(['bass1','bass2'],'synth');
synths.forEach( elm =>{ // Typescript won't hates spread for some reason
    instrument.list.push(elm.title)
})

const OptionsBoxInfo = {
    buttons : [pushBtn],
    sliders : [tabLength,rootNote,longestNote,bpm,distortion,handPosition],
    dropDown : [tabType,scale,instrument]
}

export default OptionsBoxInfo;
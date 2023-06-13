import { scales } from "../../../Data/Music/TabGeneration/scale";
// import {synths} from '../../../Tone/instrumentClass';
import { instruments } from "../../../Tone/instrumentContainer";
import { getInstrumentNames } from "../../../Data/Music/Instruments";
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
    value : number | number[]; valueMin : number; valueMax : number;
    name : string;
    scale : number;
    constructor(value:number | number[],valueMin:number,valueMax:number,name:string, scale:number){
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
class Radio{
    values : number[];
    name: string;
    constructor(values:number[],name:string){
        this.values = values; this.name = name;
    }
}
const pushBtn = new Button("New Tab",()=>{console.log("push pls")},'pushButton');

const tabLength     = new Slider(6,0,12,'tabLength',1);
const rootNote      = new Slider(7,0,24,'rootNote',1);
const bpm           = new Slider(150,0,250, 'bpm',1);
const distortion    = new Slider (0,0,10,'distortion',1);
const handPosition  = new Slider(0,0,12,"handPosition",1)

const tabType       = new DropDown([],'tabType'); // Mayo?
const tabTypes = getInstrumentNames();
tabTypes.forEach(elm => tabType.list.push(elm));
const scale         = new DropDown([],'scale');
scales.forEach(elm => {
    scale.list.push(elm.name);
});
const instrument    = new DropDown([],'synth');
instruments.forEach( elm =>{ // Typescript won't hates spread for some reason
    // Create a split at the start of an instrument
    let title = elm.title;
    let check = title.slice(title.length-1)
    if (check === "1"){
        let splitStr = "<split>"+title.slice(0,title.length-1);
        instrument.list.push(splitStr)
    }
    instrument.list.push(elm.title)
})

const noteLengths = new Radio([1,2,4,8,16],"noteLengths");

const OptionsBoxInfo = {
    buttons : [pushBtn],
    sliders : [tabLength,rootNote,bpm,distortion,handPosition],
    dropDown : [tabType,scale,instrument],
    radio : [noteLengths]
}

export default OptionsBoxInfo;
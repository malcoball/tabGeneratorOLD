import { scales } from "../../../Data/Music/TabGeneration/scale";
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
    constructor(value:number,valueMin:number,valueMax:number,name:string){
        this.value = value; this.valueMin = valueMin; this.valueMax = valueMax;
        this.name = name;
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
const pushBtn = new Button("Push to tab",()=>{console.log("push pls")},'pushButton');

const tabLength     = new Slider(6,0,12,'tabLength');
const rootNote      = new Slider(7,0,24,'rootNote');
const longestNote   = new Slider(4,1,8,'longestNote');
const bpm           = new Slider(150,0,250, 'bpm');
const distortion    = new Slider (0,0,10,'distortion');

const tabType       = new DropDown(['bass','guitar'],'tabType');
// const scale         = new DropDown(['aeolian','blues'],'scale');
const scale         = new DropDown([],'scale');
scales.forEach(elm => {
    scale.list.push(elm.name);
    console.log(elm.name);
});
const instrument    = new DropDown(['bass1','bass2'],'instrument');

const OptionsBoxInfo = {
    buttons : [pushBtn],
    sliders : [tabLength,rootNote,longestNote,bpm,distortion],
    dropDown : [tabType,scale,instrument]
}

export default OptionsBoxInfo;
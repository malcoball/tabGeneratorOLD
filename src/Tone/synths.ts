import * as Tone from 'tone';


export const synths :{synth: any, title : string}[] = [];
class Synth {
    synth : any; title : string;
    constructor(synth:any,title:string){
        this.synth = synth;
        this.title = title;
        synths.push(this);
    }
}

new Synth(new Tone.Synth().toDestination(),"synth1");
new Synth(new Tone.FMSynth().toDestination(),"synth2");
new Synth(new Tone.AMSynth().toDestination(),"synth3");

export const getSynth = (name:string) :any=>{
    let out;
    // CAN BE OPTIMISED
    synths.forEach(element => {
        if (element.title === name){
            out = element;
        }
    })
    return out;
}
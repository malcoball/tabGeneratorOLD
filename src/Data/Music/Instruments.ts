const instruments :any[] = [];
class instrument{
    name:string;breakPoints : number[]; stringNames : string[]; octave : number;
    constructor(name:string,breakPoints:number[],stringNames:string[],octave:number){
        this.name = name;
        this.breakPoints = breakPoints;
        this.stringNames = stringNames;
        this.octave = octave;
        instruments.push(this);
    }
}

new instrument("bass",[0,5,10,15],["E","A","D","G"],1);
new instrument("guitar",[0,5,10,15,19,24],["E","A","D","G","B","e"],2);
new instrument("banjo",[0,5,10,14,17],["G","D","G","B","d"],2);

const getInstrument = (name:string): any=>{
    let out = null;
    for (let i = 0; i < instruments.length; i++){
        if (instruments[i].name == name) {
            out = instruments[i]; i = instruments.length;
        }
    }
    if (out !== null){ return out; } else {
        console.log(`${name} not recognised`);
    }
}

export default getInstrument;
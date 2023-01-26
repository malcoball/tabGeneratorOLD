export let scales:any[] = []
class scale {
    name: string; 
    scale:number[];
    constructor(name:string,scale:number[]){
        this.name = name;
        this.scale = scale;
        scales.push(this);
    }
}

new scale("ionian",[0,2,4,5,7,9,10]);
new scale("dorian",[0,2,3,5,7,9,10]);
new scale("phrygian",[0,1,3,5,7,8,9,10]);
new scale("blues",[0,1,3,5,7,8,9,10]);

const sortByName = ()=>{
    const arrIn = scales;
    const arrOut = [...arrIn];
    for (let i = 0; i < arrOut.length; i++){
        for (let j = 0; j < arrOut.length; j++){
            if (arrOut[i].name < arrOut[j].name){
                // Swap pls
                let temp = arrOut[j]; 
                arrOut[j] = arrOut[i];
                arrOut[i] = temp;
            }
        }
    }
    scales = arrOut;
}
sortByName();

export const getScaleByName = (name:string)=>{
    for (let i = 0 ;i < scales.length; i++){
        if (name === scales[i].name) return scales[i];
    }
    console.error(name," : not recognised");
}
// Should handle importing all the synths and samplers
// That includes sorting, if I get around to it.
import bassSampler1 from "./sampler/bassSampler1";
import bassSampler2 from "./sampler/bassSampler2";
import guitarSampler1 from "./sampler/guitarSampler1";
import guitarSampler2 from "./sampler/guitarSampler2";
import pianoSampler1 from "./sampler/pianoSampler1";
import banjoSampler1 from "./sampler/banjoSampler1";
import synths from "./synths";

// Not much need for this but it saves the instruments container from getting ugly
const bassSamplers = [bassSampler1,bassSampler2];
const guitarSamplers = [guitarSampler1,guitarSampler2]
const pianoSamplers = [pianoSampler1];
const banjoSamplers = [banjoSampler1]
export const instruments = [...synths,...bassSamplers,...guitarSamplers,...pianoSamplers,...banjoSamplers];

export const getInstrument = (name:string)=>{
    for (let i = 0; i < instruments.length; i++){
        if (name === instruments[i].title) return instruments[i];
    }
    // Error handling
    console.log(name, " not found in : ",instruments);
}

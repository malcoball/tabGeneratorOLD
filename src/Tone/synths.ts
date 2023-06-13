import * as Tone from 'tone';
import { Instrument } from './instrumentClass';

const synths  :any =  []
synths.push(new Instrument(new Tone.Synth().toDestination(),"synth1"));
synths.push(new Instrument(new Tone.FMSynth().toDestination(),"synth2"));
synths.push(new Instrument(new Tone.AMSynth().toDestination(),"synth3"));

export default synths;
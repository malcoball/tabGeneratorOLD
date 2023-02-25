import * as Tone from 'tone';
import { Instrument } from '../instrumentClass';
import A3 from '../../snds/samples/piano1/A3.mp3'



const sampler = new Tone.Sampler({
	urls: {
		A3: A3,

	},
}).toDestination();
const pianoSampler1 = new Instrument(sampler,"piano1");

export default pianoSampler1;
import * as Tone from 'tone';
import { Instrument } from '../instrumentClass';
import A3 from '../../snds/samples/guitar1/A3.mp3'
import B4 from '../../snds/samples/guitar1/B4.mp3'
import E3 from '../../snds/samples/guitar1/E3.mp3'
import G4 from '../../snds/samples/guitar1/G4.mp3'



const sampler = new Tone.Sampler({
	urls: {
		A3: A3,
		B3: B4,
		E3: E3,
		G3: G4,
	},
}).toDestination();
const guitarSampler1 = new Instrument(sampler,"guitar1");

export default guitarSampler1;
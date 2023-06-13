import * as Tone from 'tone';
import { Instrument } from '../instrumentClass';
import A3 from '../../snds/samples/guitar2/A3.mp3'



const sampler = new Tone.Sampler({
	urls: {
		A3: A3,

	},
}).toDestination();
const guitarSampler2 = new Instrument(sampler,"guitar2");

export default guitarSampler2;
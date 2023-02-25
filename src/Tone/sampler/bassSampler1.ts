import * as Tone from 'tone';
import { Instrument } from '../instrumentClass';
import A2 from '../../snds/samples/bass1/A2.wav'
import D2 from '../../snds/samples/bass1/D2.wav'
import E2 from '../../snds/samples/bass1/E2.wav'
import G2 from '../../snds/samples/bass1/G2.wav'

const sampler = new Tone.Sampler({
	urls: {
		A1: A2,
		D2: D2,
		E1: E2,
		G2: G2,
	},
}).toDestination();
const bassSampler1 = new Instrument(sampler,"bass1");

export default bassSampler1;
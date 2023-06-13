import * as Tone from 'tone';
import { Instrument } from '../instrumentClass';
import D1 from '../../snds/samples/banjo1/D1.mp3'
import B2 from '../../snds/samples/banjo1/B2.mp3'
import D2 from '../../snds/samples/banjo1/D2.mp3'
import G1 from '../../snds/samples/banjo1/G1.mp3'
import G2 from '../../snds/samples/banjo1/G2.mp3'


const sampler = new Tone.Sampler({
	urls: {
		// D1: D1,
		// B2: B2,
		// D3: D2,
		G1: G1,
		// G2: G2,
	},
}).toDestination();
const banjoSampler1 = new Instrument(sampler,"banjo1");

export default banjoSampler1;
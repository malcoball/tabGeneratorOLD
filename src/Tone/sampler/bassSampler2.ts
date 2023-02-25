import * as Tone from 'tone';
import { Instrument } from '../instrumentClass';
import A2 from '../../snds/samples/bass2/A2.mp3'
import C3 from '../../snds/samples/bass2/C3.mp3'
import D3 from '../../snds/samples/bass2/D3.mp3'
import E2 from '../../snds/samples/bass2/E2.mp3'
import G3 from '../../snds/samples/bass2/G3.mp3'
import G4 from '../../snds/samples/bass2/G4.mp3'


const sampler = new Tone.Sampler({
	urls: {
		A1: A2,
		E1: E2,
		C3: C3,
		D2: D3,
		G1: G3,
		G2: G4,
	},
}).toDestination();
const bassSampler2 = new Instrument(sampler,"bass2");

export default bassSampler2;
import * as Tone from 'tone';
const ROOT_DIR = '../../../../assets/snds/'
// export const sampler = new Tone.Sampler({
// 	urls: {
// 		A2: "A2.wav",
// 		D2: "D2.wav",
// 	},
// 	baseUrl: ROOT_DIR + "bass 1/",
// 	// onload: () => {
// 	// 	sampler.triggerAttackRelease(["C1", "E1", "G1", "B1"], 0.5);
// 	// }
// }).toDestination();
let playSnd = ()=>{
    let audio = new Audio('./A2.wav');
    console.log("audio : ",audio);
    audio.play();
}
export default playSnd
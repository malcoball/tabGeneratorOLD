let instruments = [];


const bassSample1 = new Tone.Sampler({
    title : "bass1",
	urls: {
        A2 : "A2.wav",
        D2 : "D2.wav",
        E2 : "E2.wav",
        G2 : "G2.wav"
	},
	baseUrl: "Assets/Snds/Bass 1/",
}).toDestination();
bassSample1.name = "bass1"; // This is a bit ugly but it works I guess, tried putting it in the sampler
bassSample1.title = "bass1"; // This is a bit ugly but it works I guess, tried putting it in the sampler
bassSample1.bString = 16; // This is a bit ugly but it works I guess, tried putting it in the sampler




const bassSample2 = new Tone.Sampler({
    urls: {
        A2 : "A2.mp3",
        C3 : "C3.mp3",
        D3 : "D3.mp3",
        E2 : "E2.mp3",
        // G3 : "G3.mp3",
        // G4 : "G4.mp3"
    },
    baseUrl: "Assets/Snds/Bass 2/",
}).toDestination();
bassSample2.name = "bass2"
bassSample2.title = "bass2";
bassSample2.bString = 16; // This is a bit ugly but it works I guess, tried putting it in the sampler

const pianoSample1 = new Tone.Sampler({
    urls: {
        A3 : "A3.mp3",
        B3 : "B3.mp3",
        C4 : "C4.mp3",
        D4 : "D4.mp3",
        E4 : "E4.mp3",
        F4 : "F4.mp3",
        G4 : "G4.mp3"
    },
    baseUrl: "Assets/Snds/Piano 1/",
}).toDestination();
pianoSample1.name = "piano1";
pianoSample1.title = "piano1";
pianoSample1.bString = 28; // This is a bit ugly but it works I guess, tried putting it in the sampler

const guitarSample1 = new Tone.Sampler({
    title : "guitar1",
    urls: {
        A3 : "A3.mp3",
        B4 : "B4.mp3",
        D3 : "D3.mp3",
        E3 : "E3.mp3",
        // E4 : "E4.mp3",
        // G4 : "G4.mp3"
    },
    baseUrl: "Assets/Snds/Guitar 1/"
}).toDestination();
guitarSample1.name = "guitar1";
guitarSample1.title = "guitar1";
guitarSample1.bString = 28; // This is a bit ugly but it works I guess, tried putting it in the sampler


instruments.push(bassSample1,bassSample2,pianoSample1,guitarSample1);
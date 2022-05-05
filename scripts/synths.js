let synths = [
    new Tone.Synth().toDestination(),
    new Tone.FMSynth().toDestination(),
    new Tone.AMSynth().toDestination(),
]
synths[0].title = "synth1";
synths[1].title = "synth2";
synths[2].title = "synth3";
synths[0].name = "synth1";
synths[1].name = "synth2";
synths[2].name = "synth3";
synths[0].bString = 16;
synths[1].bString = 16;
synths[2].bString = 16;
for (let i=0;i<synths.length;i++){
    instruments.push(synths[i]);
}
sortObjArr(instruments);
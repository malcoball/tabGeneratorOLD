const noteToNumber = (note:string)=>{
    switch(note){
        case  "C" : return 0;
        case "C#" : return 1;
        case  "D" : return 2;
        case "D#" : return 3;
        case  "E" : return 4;
        case  "F" : return 5;
        case "F#" : return 6;
        case  "G" : return 7;
        case "G#" : return 8;
        case  "A" : return 9;
        case "A#" : return 10;
        case  "B" : return 11;
        default : console.error(note, " not recognised."); return 0;
    }
}
const numberToNote = (number:number)=>{
    switch(number){
        case 0  : return "C";
        case 1  : return "C#";
        case 2  : return "D";
        case 3  : return "D#";
        case 4  : return "E";
        case 5  : return "F";
        case 6  : return "F#";
        case 7  : return "G";
        case 8  : return "G#";
        case 9  : return "A";
        case 10 : return "A#";
        case 11 : return "B";
        default : console.error (number + "not recognised.");return "";
    }
}

const parseOctave = (number:number)=>{
    let out = number;
    let count = 0;
    while (out >= 12) {
        out -= 12;
        count++;
    }
    return {out,count};
}

const tabNumberToNote = (number:number,octaveIn:number,rootNote:string)=>{
    // E => 4
    let root = noteToNumber(rootNote);
    // 14 => D2
    let inp = parseOctave(number+root);
    // Get D
    let letter = numberToNote(inp.out);
    // Get 2
    let octave = inp.count+octaveIn;
    return letter + octave;
}
export {tabNumberToNote}
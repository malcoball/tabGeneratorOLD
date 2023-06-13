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

export const tabNumberToNote = (number:number,octaveIn:number,rootNote:string)=>{
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

export const lengthToNoteLength = (noteIn:number)=>{
    switch(noteIn){
        case 6 : return 32;
        case 5 : return 16;
        case 4 : return 8;
        case 3 : return 4;
        case 2 : return 2;
        case 1 : return 1;
    }
}
export const inputToLength = (inputValue : number)=>{
    switch (inputValue){
        case 1 : return 1; 
        case 2 : return 2; 
        case 4 : return 3; 
        case 8 : return 4; 
        case 16 : return 5; 
        default : return 5;
    }
}
export const LengthToInput = (inputValue : number)=>{
    // Not sure why this is the opposite to the previous func but it works?
    switch (inputValue){
        case 1 : return 15; 
        case 2 : return 7; 
        case 3 : return 3;
        case 4 : return 1;
        case 5 : return 0;
        default : return 0;
    }
}
export const bpmToSec = (bpm:number)=>{
    // 60 => 1000, 120 => 500
    // 60 => 120 * 2, 1000 => 500 /2 
    let diff = bpm / 60; // 120 => 2
    return 1000 / diff;
}
export const noteLengthSec = (sec:number,noteLength:number)=>{
    switch (noteLength){
        case 5 : return sec/2;
        case 4 : return sec;
        case 3 : return sec *2;
        case 2 : return sec *4;
        case 1 : return sec *8;
        default: console.log("note length bruh : ",noteLength)
    }
}
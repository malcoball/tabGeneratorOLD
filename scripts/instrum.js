// Handle making of new instruments
let instrums = [];
class Instrum {
    constructor(name, strings) {
        this.name = name;
        this.strings = strings;
        this.bString = noteToConv(this.strings[0]);
        instrums.push(this);
    }
    break(){
        // Gets where the next string starts (e = 5 = a)
        let btmString = noteToConv(this.strings[0]);
        let tarString = noteToConv(this.strings[string+1]);
        return tarString-btmString;
    }
    openStrings(){
        // return array of string names
        let out =[];
        let len = this.strings.length;
        for(let i=0;i<len;i++){
            out.push(this.strings[i].slice(0,1));
        }
        return out;
    }
}

const guitar = new Instrum("guitar",["E3","A4","D4","G4","B5","e5"]);
const bass = new Instrum("bass",["E2","A3","D3","G3"]);
// const bass5str = new Instrum("bass5string",["B1","E1","A2","D2","G2"]);
// const ukelele = new Instrum("ukelele",["G3","C3","E3","A4"]);
instrums = sortObjArr(instrums);

function noteToConv(inp){
    // Should be useful for finding out break points and maybe other stuff.
    let out;
    switch(inp){
        case  "C1" : out = 0; break;
        case "C#1" : out = 1; break;
        case  "D1" : out = 2; break;
        case "D#1" : out = 3; break;
        case  "E1" : out = 4; break;
        case  "F1" : out = 5; break;
        case "F#1" : out = 6; break;
        case  "G1" : out = 7; break;
        case "G#1" : out = 8; break;
        case  "A1" : out = 9; break;
        case "A#1" : out = 10;break;
        case  "B1" : out = 11;break;
        case  "C2" : out = 12;break;
        case "C#2" : out = 13;break;
        case  "D2" : out = 14;break;
        case "D#2" : out = 15;break;
        case  "E2" : out = 16;break;
        case  "F2" : out = 17;break;
        case "F#2" : out = 18;break;
        case  "G2" : out = 19;break;
        case "G#2" : out = 20;break;
        case  "A2" : out = 21;break;
        case "A#2" : out = 22;break;
        case  "B2" : out = 23;break;
        case  "C3" : out = 24;break;
        case "C#3" : out = 25;break;
        case  "D3" : out = 26;break;
        case "D#3" : out = 27;break;
        case  "E3" : out = 28;break;
        case  "F3" : out = 29;break;
        case "F#3" : out = 30;break;
        case  "G3" : out = 31;break;
        case "G#3" : out = 32;break;
        case  "A3" : out = 33;break;
        case "A#3" : out = 34;break;
        case  "B3" : out = 35;break;
        case  "C4" : out = 36;break;
        case "C#4" : out = 37;break;
        case  "D4" : out = 38;break;
        case "D#4" : out = 39;break;
        case  "E4" : out = 40;break;
        case  "F4" : out = 41;break;
        case "F#4" : out = 42;break;
        case  "G4" : out = 43;break;
        case "G#4" : out = 44;break;
        case  "A4" : out = 45;break;
        case "A#4" : out = 46;break;
        case  "B4" : out = 47;break;
        case  "C4" : out = 48;break;
        case "C#4" : out = 49;break;
        case  "D4" : out = 50;break;
        case "D#4" : out = 51;break;
        case  "E4" : out = 52;break;
        case  "F4" : out = 53;break;
        case "F#4" : out = 54;break;
        case  "G4" : out = 55;break;
        case "G#4" : out = 56;break;
        case  "A4" : out = 57;break;
        case "A#4" : out = 58;break;
        case  "B4" : out = 59;break;
    }
    return out;
}

function makeNotes(){
    let out = [];
    let counter = 0;
    let len = 12*4; // How many notes to output pretty much
    let set = 1;
    let octave = [
        "C",
        "C#",
        "D",
        "D#",
        "E",
        "F",
        "F#",
        "G",
        "G#",
        "A",
        "A#",
        "B",
    ]
    for (let i=0; i<len; i++){
        out.push(octave[counter]+set);
        if (counter < octave.length-1){
            counter ++;
        } else {
            set ++;
            counter = 0;
        }
    }

    return out;
}
const notes = makeNotes();


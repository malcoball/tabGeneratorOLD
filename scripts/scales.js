let scales = [];
class makeScale {
    constructor(scale, name) {
        this.scale = scale;
        this.name = name;
        scales.push(this);
    }
}
class Note {
    constructor(note, length) {
        this.note = note;
        this.length = length;
        this.lengthConvert();
    }
    lengthConvert() {
        this.length = this.length + "n";

    }
}
new makeScale([0, 3, 5, 7, 10], "minor Pentatonic");
new makeScale([0, 2, 4, 7, 9], "major Pentatonic");
new makeScale([0, 3, 5, 6, 7, 10, 12], "blues");
new makeScale([0, 2, 4, 5, 7, 9, 11, 12], "ionian");
new makeScale([0, 2, 3, 5, 7, 8, 10, 12], "aeolian");
new makeScale([0, 2, 3, 5, 7, 9, 10, 12], "dorian");
new makeScale([0, 1, 3, 5, 7, 8, 10, 12], "phyrygian");
new makeScale([0, 2, 4, 6, 7, 9, 11, 12], "lydian");
// Scales
let tabTemp = []; // Used so the synth can play

let tabPerm = [];

scales = sortObjArr(scales);
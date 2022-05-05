// Tab decorators
const marker = "_"; // Used to show there's no note
const marker2 = "-";// Used to show there's

function tabArray(length,scale,rootnote,start = 0){
    // generate a tab in the form of a single array
    rootnote = parseInt(rootnote);
    scale = scales[scale].scale; // a bit ugly but it makes the call function cleaner

    // Move the input scale based on the root note
    let scaleTemp = [];
    if (rootnote != 0){ // Skips if not needed
        for (let i = 0; i < scale.length; i++){
            scaleTemp.push(scale[i]+rootnote);
        } 
    } else {
        scaleTemp = scale;
    }
    let out = [];
    for (i=start;i<length;i++){
        if (i==0){ // Rootnote, don't know why it's still 8 though
            out.push(new Note(rootnote,8));
        } else {
            // COULD BE OPTIMISED by changing the order of if statements but it's minute honestly.
            let noteLength = 0;
            if ((length - i) > 3){
                noteLength = Math.round(Math.random()*2);
            } else 
            if ((length - i) > 1){
                noteLength = Math.round(Math.random());
            }
            let randomNum = Math.floor(Math.random()*scaleTemp.length); // Get random note from scale
            /*the range of notes goes from 1n(being a full note), and 8n being an 8th,
            so with this 1n need to output 7 markers, */
            switch (noteLength){
                // 8th / 1/8 note
                case 0 : out.push(new Note(scaleTemp[randomNum],8)); break;

                // 1/4 note
                case 1 : 
                    out.push(new Note(scaleTemp[randomNum],4)); // Push the note
                    out.push(new Note(marker2,4)); // Push the marker, shows how long the note is
                    i+=1;
                    break;

                // 1/2 note
                case 2 : 
                    out.push(new Note(scaleTemp[randomNum],2)); // Push the note
                    for (let a=0; a<3; a++){
                        out.push(new Note(marker2,2));
                        i++;
                    }
                    break;
                // 1 note
                case 3 : 
                    out.push(new Note(scaleTemp[randomNum],1)); // Push the note
                    for (let a=0; a<7; a++){
                        out.push(new Note(marker2,1));
                        i++;
                    }
                    break;
            }
        }
    }
    return out;
}
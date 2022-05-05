// Deals with all the tab windows stuff, so it doesn't do anything till a tab has been made.

let windows = 0;
let gloInstrum = 0;
let highlightBox = -1;
function wipeTable(){
    smallTab.childNodes[0].remove();
}

function makeTable(tabIn,instrument = instrums[gloInstrum]){
    // Read the change 1d array into 2d array based on the notes

    // length is how many rows there are
    let strings = instrument.strings
    let len = strings.length; 
    let currentCell = -1;
    let currentLine = -1;
    let notePrint = 0;

    // Make empty arrays
    let out = [];
    let content ;
    for (let i=0; i<len; i++){
        out.push([])
    };
    console.log("New tab");
    for (i=0; i<len; i++){ // Height
        for (j=0; j<tabIn.length; j++){
            let num = tabIn[j].note; 
            let noteLength = noteLengthCon(tabIn[j].length);
            // if (i == len-1){ // Top string. Keeps the note here.
            //     if (num > 5*i){
            //         content = num - (5*i);
            //         console.log(`i : ${i}, num : ${num}`);
            //         // content = num;
            //     }
            // } else
            if ((num >= 5*i) && (num < 5*(i+1))){
                content = num-(5*i);
                // Marks the place of the note, if that note needs to affect the next cell/cells
                if (noteLength > 0){
                    currentLine = i;
                    currentCell = j+1;
                    notePrint = noteLength; // how many times it needs to output basically
                }
            } else {
                // No note to output on this string so it gets a marker
                // marker2 is for a note extension.
                if ((currentLine == i) && (currentCell == j)){
                    if (notePrint > 0){
                        content = marker2;
                        currentCell++;
                        notePrint--;
                    } else {
                        content = marker;
                    }
                } else {
                    content = marker;
                }
            }

            out[i].push(content);

        }
    }
    return out;
}
function noteLengthCon(noteLength){
    switch(noteLength){
        case "8n": return 0;
        case "4n": return 1;
        case "2n": return 3;
        case "1n": return 7;
    }
}
function permTabSetup(){
    // Main function that sets up the table for the permanent tab, should work dynamically, whatever that means
    // Get amount of lines to output, and their respective string names
    let openStr = getArrFromName(tabType,"int",instrums);
    openStr = instrums[openStr].openStrings();

    let target = document.querySelector("#permTabDisplay00");
    target.strings = openStr.length;
    target.tab = [];
    target.tabLength = 0;
    for (let i = openStr.length-1; i > -1; i --){
        let row = document.createElement("div");
        row.id = `permTabRow${i}`;
        row.innerHTML = openStr[i]+"[";
        target.append(row);
    }

    // Play button's function
    document.querySelector("#playMainBtn").addEventListener(("click"),()=>{
        // Get the hidden tab info
        let tabGet = document.querySelector("#permTabDisplay00").tab;
        console.log(tabGet);
        tabGet = JSON.parse(tabGet);
        playTab(tabGet,-1)
    })
    // Wipe button's function
    document.querySelector("#wipeMainBtn").addEventListener(("click"),()=>{
        // Get the hidden tab info
        wipePermTab(true);
    })
}
function permTabPush(tabIn){

    let target = document.querySelector("#permTabDisplay00");
    if (target.tab == ""){
        target.tab = tabIn;
    } else {
        // Need to be converted fwd then back, alot of wackiness
        let conv1 = JSON.parse(target.tab);
        let conv2 = JSON.parse(tabIn);
        let conv3 = JSON.stringify(conv1.concat(conv2));
        target.tab = conv3;
    }
    
    wipePermTab(false);
    tabIn = JSON.parse(target.tab);
    let tab = makeTable(tabIn);

    for (let i = 0; i < target.strings; i++){ // Verticle
        let targetRow = document.querySelector("#permTabRow"+i);
        for (let j = 0; j < tab[i].length; j++){
            let text = document.createElement("span");
            text.innerHTML = `${tab[i][j]} `;
            text.className = "tab-1";
            if (tab[i][j] != marker) text.id = `note${j}`;
            if (j == tab[i].length-1) text.innerHTML += "]";
            targetRow.append(text);
        }
    }

}
function wipePermTab(destroyTab){
    let target = document.querySelector("#permTabDisplay00");
    let targets = target.childNodes;
    for (let i = 1; i < targets.length; i++){
        let txt = targets[i].innerHTML.slice(0,2);
        targets[i].innerHTML = txt;
    }
    if (destroyTab == true)   target.tab = JSON.stringify([]);
}
function outputTableNew(output,tabin){
    let target = document.querySelector(output);
    let tab = makeTable(tabin);
    let tbl = document.createElement("div");
    tbl.className = "tabTempBox";
    tbl.id = `tabTempBox${windows}`;
    tbl.selectedNote = 0;
    tbl.rootNote = tabRootIn.value;
    tbl.scale = scaleIn.innerHTML;
    tbl.length = tabLengthIn.value;
    target.append(tbl);

        // Top side
        let tDiv = document.createElement("div");
        tDiv.className = "tabTempTop";
        tbl.append(tDiv);

         // Arrows
         let arrowDiv = document.createElement("div");
         tDiv.append(arrowDiv);
         arrowDiv.id = "arrowDiv";
         for (let i = 0; i < 2; i++){
             let arrow = document.createElement("img");
             arrow.src = "assets/graphics/arrow 01.png";
             arrow.className = "tabArrow1";
             
             if (i == 0){
                arrow.className += " tabArrowL";
                arrow.addEventListener("click",()=>{
                    setRefreshNote(tbl,0);                    
                })
                
             } else {
                arrow.className += " tabArrowR";
                arrow.addEventListener("click",()=>{
                    setRefreshNote(tbl,1);                    
                })
             }
             
             arrowDiv.append(arrow);
         }

         // Cross
         let crossDiv = document.createElement("div");
         tDiv.append(crossDiv);
         crossDiv.id = "crossDiv";
          let cross = document.createElement("img");
          cross.src = "assets/graphics/cross 00.png";

          crossDiv.append(cross);
          cross.className = "exitBtn";
          cross.id = `closeBtn${windows}`;
          closeWindow(cross);
          

        // Bottom side
        let bDiv = document.createElement("div");
        bDiv.className = "tabTempBtm";
        bDiv.id = `tabTempBtm${windows}`;
        tbl.append(bDiv);

        //  // Left side
        makeTabDisplay1(bDiv,tab,windows);
 
         // Right side
         let rDiv = document.createElement("div");
         rDiv.id="tabTempRBox";

         // Refresh button
         let btn1 = document.createElement("img");
         btn1.src="assets/graphics/refresh 00.png";
         btn1.id=`refreshBtn${windows}`;
         btn1.addEventListener("click",(e)=>{
             let tab = refreshTable(e.target.id,2);
             hide.innerHTML = JSON.stringify(tab);
         })

         // Play button
         let btn2 = document.createElement("img");
         btn2.src="assets/graphics/play 00.png";
         btn2.id=`playBtn${windows}`;
         btn2.addEventListener("click",(e)=>{
             // Gets the hidden tab info
            let out = e.target.id;
            out = out.slice(7);
            highlightBox = out;
            console.log(`highlightBox : ${highlightBox}`);
            out = document.querySelector("#tempTabHide"+out).textContent;
            out = JSON.parse(out);

            // Plays the tab
            playTab(out,highlightBox)
            
         })

         // Push button
         let btn3 = document.createElement("img");
         btn3.src="assets/graphics/arrow 01.png";
         btn3.id=`pushBtn${windows}`;
         btn3.className="tabTempPushBtn";
         btn3.addEventListener("click",()=>{
            permTabPush(hide.innerHTML);
            //  alert("Push to main tab pls");
         })
         

         rDiv.append(btn1);
         rDiv.append(btn2);
         rDiv.append(btn3);
         bDiv.append(rDiv);

        // Saves the tab so it can be read by the machine easier
        let hide = document.createElement("span");
        hide.id = "tempTabHide"+windows;
        hide.className = "noDisplay";
        hide.innerHTML = JSON.stringify(tabin);
        tbl.append(hide);      

    windows ++;

}
function setRefreshNote(target,dir){
    // Sort th changing 
    let length = target.childNodes[1].childNodes[0].tabLength-1;
    let int = target.selectedNote;
    let noteTarget = document.querySelector("."+target.className+` #note${int}`);
    noteTarget.classList.toggle("noteSelect");


    
    // Update the root selected note
    if (dir == 1){
        if (int == length){
             int = 0; // Reset to start position
             let notes = document.querySelectorAll("."+target.className);
             for (let i = 0 ; i < notes.length; i++){
                 notes[i].classList.toggle("noteSelect");
             }
        }
        else int ++;
    } else {
        if (int == 0) int = length;
        else int --;
    }
    target.selectedNote = int;
}
function highlightNote(counter,tabTarget,end = false){
    if (end == false){
        if (play !== null){
            let target = document.querySelector(`.tab${tabTarget}#note${counter}`);
            target.classList.toggle("noteHighlight");

            // Lowlight note, if that's a word
            if (counter > 0){
                let target = document.querySelector(`.tab${tabTarget}#note${counter-1}`);
                target.classList.remove("noteHighlight");
            }
        }
    } else {
        // Main difference is it doesn't toggle the last note. 
        let target = document.querySelector(`.tab${tabTarget}#note${counter}`);
        target.classList.toggle("noteHighlight");
    }
}

function makeTabDisplay1(target,tabIn,id){
    // Left side
    let outid = target.id.slice(10);
    let lDiv = document.createElement("div");
    let selectedNote = target.parentNode.selectedNote;
    lDiv.id = `tempTab${id}`;
    let openStr = getArrFromName(tabType,"int",instrums);
    openStr = instrums[openStr].openStrings();
    for (i=tabIn.length-1; i> -1; i--){
        let row = document.createElement("div");
        row.innerHTML = `${openStr[i]}[`;
        for (j=0; j<tabIn[i].length; j++){
            let inRow = document.createElement("span");
            let txt = tabIn[i][j];
            inRow.innerHTML = `${txt}  `
            // Add 
            if (txt != marker){
                inRow.className = `tab${outid}`;
                inRow.id = `note${j}`;
                if (j < selectedNote) inRow.className += " noteSelect"; // <- What's this?
            }
            row.append(inRow);
        }
        row.innerHTML += "]";
        lDiv.append(row);
    }
    target.append(lDiv);

    // NEEDS UPDATING, doesn't count the end note length, but then that's a bug anyway.
    lDiv.tabLength = tabIn.length;
}

function pushToPerm(tabIn){
    let len = tabIn.length;
    let out = [];
    for(let i = 0; i < len; i++){
        tabPerm.push(tabIn[i]);
    }
    // return out;
}

function getInstrum(instrum){
    switch(instrum){
        case "bass": return bass;
        case "bass5str": return bass5str;
        case "guitar": return guitar;
        case "ukelele": return ukelele;
    }
}

function tabRefresh(){
    // Get the input values
    let scale =  parseInt(scaleIn.value);
    let length = parseInt(lengthIn.value);
    let root = parseInt(rootIn.value);

    let tab = tabArray(length,scale,root);

    tabTemp = tab;
}

function closeWindow(target){
    target.addEventListener("click",()=>{
        let windowId =  "#tabTempBox"+target.id.slice(8);
        let window = document.querySelector(windowId);
        window.className += " fadeOut";
        setTimeout(()=>{
            window.remove();
        },250)
    })
}
function pushTabToMain(tabIn){
    permTabSetup();
}
permTabSetup();

function playTab(out,highlight){
    let selectedSynth = getElmFromTitle("Instrument").value;
    selectedSynth = getArrFromName("bass1","arr",instruments);
    playNotes(true,out,highlight,3);
}

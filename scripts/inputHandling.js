// Needs domOutput.js to run, this also sorts out the list buttons
// Number inputs
const tabLengthIn   = document.querySelector("#lengthInput");
const tabRootIn     = document.querySelector("#rootInput");
const tabBpmIn      = document.querySelector("#bpmInput");
const tabBtn        = document.querySelector("#pushTabBtn");
const scaleIn = document.querySelector("#scaleInp");
scaleIn.innerHTML = scales[0].name;
const tabTypeIn = document.querySelector("#tabInp");
tabTypeIn.innerHTML = instrums[0].name;

// Volume slider
const body = document.querySelector("html");

// Stuff for the player
// let sInstrument = getElmFromTitle("Instrument").childNodes[1].firstChild.innerHTML;
let sInstrumentTarget = getElmFromTitle("Instrument");
let sInstrument = sInstrumentTarget.childNodes[1].firstChild.innerHTML;
    sInstrument = getArrFromName(sInstrument,"int",instruments);

sInstrumentTarget.addEventListener("click",()=>{
    sInstrument = sInstrumentTarget.childNodes[1].firstChild.innerHTML;
    sInstrument = getArrFromName(sInstrument,"int",instruments);
})





tabBtn.addEventListener("click",()=>{
    let tab = makeArrFromInp();
    outputTableNew("#tabTemps",tab);
})

function makeArrFromInp(){
    let length = tabLengthIn.value;
    let scale = scaleIn.innerHTML;
    scale = getArrFromName(scale,"int");
    let rootNote = tabRootIn.value;
    let out = tabArray(length,scale,rootNote); // Change this for different tabs
    return out;
}
function refreshArrFromElm(target,ind = 0,tabStart = 3){
    let element = document.querySelectorAll(target)[ind];
    tabStart = element.selectedNote;

    // Get original tab
    let ogTab = element.childNodes[2].innerHTML;
    ogTab = JSON.parse(ogTab);
    let outTab = [];
    // Cut it down
    for (let i = 0; i < tabStart; i++){
        outTab[i] = ogTab[i];
    }

    // Create new tab
    let length = element.length;
    let scale = element.scale;
    scale = getArrFromName(scale,"int");
    let rootNote = element.rootNote;
    let newTab = tabArray(length,scale,rootNote,tabStart); // Change this for different tabs

    // Merge 2 tabs
    for (let i = 0; i < newTab.length; i++){
        outTab.push(newTab[i]);
    }
    
    return outTab;
}
function makeArrFromElm(target,ind = 0){
    // Takes the saved array of element and returns it, useful for when the format needs to be changed
    // Select the element
    let element = document.querySelectorAll(target)[ind];
    // Get the array
    element = element.lastElementChild.innerHTML;
    // convert JSON
    element = JSON.parse(element);
    return element;
}


function refreshTable(target,newTab,tabTempBox = ".tabTempBox",ind = 0){
    // ind is for when this is being used in a loop,mostly
    let id = target;
    if (typeof(target) == "string") target = target.slice(10);
    target = "tabTempBtm" + target;

    target = document.querySelector("#"+target);
    const temp = target.childNodes[1]; // Save the buttons
    target.childNodes[0].remove();
    target.childNodes[0].remove();

    // Either makes a tab based on the inputs or gets it from an element
    let tab;
    let output;
    if (newTab == 0){
        tab = makeArrFromInp();
        console.log("this being ran, quick!")
    } else 
    if (newTab == 1){
        // Current only works with temp tab boxes, can't see any other need yet
        tab = makeArrFromElm(tabTempBox,ind);
    } else {
        tab = refreshArrFromElm(tabTempBox,ind);
        output = tab;        
    }
    // Converts the tab innit
    tab = makeTable(tab);

    makeTabDisplay1(target,tab,id); 
    target.append(temp);   
    return output;
}
function refreshTables(length){
    for (let i = 0; i < length; i++){
        refreshTable(i,true,`.tabTempBox`,i);
    }
}

function closeSideBar(inp,side = "Left",int = 0){
    let target = document.querySelectorAll(`#nav${side} .optionBox`);
    target[int].classList.toggle("noDisplay");
    if (int != target.length-1){
        setTimeout(()=>{
            closeSideBar(inp,side,int+1);
        },50);
    } else {
        // Goes to the image the button is clicked
        let target = inp.target;
        if (target.tagName == "BUTTON"){
            target = target.firstChild;
        }

        // Bit messy but it just swaps between images
        let imgSrc = target.src;
        let len = imgSrc.length;
        imgSrc = imgSrc.slice(len-5,len-4);
        if (imgSrc == "2"){
            target.src = img1;
        } else {
            target.src = img2;
        }
        if (side == "Right"){
            // Gets the image src independent of the origin
            let strLen = target.src.length;
            strLen = target.src.slice(strLen-5,strLen-4);
            
            if (strLen == "2"){
                target.parentElement.classList.toggle("rightBtnMove");
            }
        }

        // Shrink the background
        document.querySelector(`#behind${side}`).classList.toggle("behindNavsHide");

        // Change the foreground size
        target = document.querySelector("section");
        if (side == "Left"){
            target.classList.toggle("secLeftGrow");
        } else {
            target.classList.toggle("secRightGrow");

        }
    }
}
const img1 = "assets/graphics/arrow 01.png";
const img2 = "assets/graphics/arrow 02.png";
const closeBtn1 = document.querySelector("#hideBtnLeft");
const closeBtn2 = document.querySelector("#hideBtnRight");
closeBtn1.addEventListener("click",(e)=>{
    closeSideBar(e,"Left");
});
closeBtn2.addEventListener("click",(e)=>{
    closeSideBar(e,"Right");
});
navLeft.addEventListener("resize",()=>{
    console.log("shit moved yo");
})
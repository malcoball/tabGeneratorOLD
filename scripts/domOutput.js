// Pretty much deals with all the DOM stuff that's not tabs, so like the side panels

const navLeft = document.querySelector("#navLeftDiv");
const navRight = document.querySelector("#navRightDiv");

const triangle = `<img  class="dwnArrow" src="assets/graphics/Arrow.png" alt="btn" srcset="">`;
let elmNumber = 0;
let tabType = "bass";


function setID(txt){
    switch(txt){
        case "Tab Type":    return "tabInp";
        case "Scale : " :    return "scaleInp";
        default:console.log(txt);     return "notSet";
    }
}

function makeElm(title,innerText,target,btnType,list){

    // Create the main box
    const div = document.createElement("div");
    div.className = "optionBox";
    div.id = `optionBox${elmNumber}`;
    div.value = innerText;
    target.append(div);

     const mainTitle = document.createElement("h3");
     mainTitle.innerHTML = title;
     div.append(mainTitle);

      
      // Make the inner box
      const inDiv = document.createElement("div");
      inDiv.className = "optionInnerBox";
      inDiv.id = `element${elmNumber}`;
      div.append(inDiv);

      const inTxt = document.createElement("span");
      inTxt.innerHTML = innerText;
      inDiv.append(inTxt);

      if (btnType == 0 || btnType == 2){ // Open drop down menu
       // DOM stuff
       inTxt.className = "btnSpan";
       inTxt.id = setID(title);
       const btn = document.createElement("button");
       btn.id = `elementBtn${elmNumber}`;
       // Add image to the button duh
       const arrow = document.createElement("img");
       arrow.src = "assets/graphics/Arrow.png";
       arrow.className = "dwnArrow"; 
       arrow.id = `dwnArrow${elmNumber}`;
       btn.append(arrow);

       // Add functionality
       btn.addEventListener("click",(e)=>{
           hideMenu(e.target.id);
       })

       inDiv.append(btn);
       // Binds the dropdown menu to the button
       makeDropDown(`#optionBox${elmNumber}`,list);
        div.addEventListener("focusout",(e)=>{
                setTimeout(()=>{
                    if (btnType == 2){
                        let txt = e.target.parentNode.childNodes[0].innerHTML;
                        if (txt != tabType){
                            // Replaces variables duh
                            tabType = txt;
                            gloInstrum = getArrFromName(txt,"int",instrums);

                            // Remake the tabs
                            let loop = document.querySelectorAll(".tabTempBox").length;
                            refreshTables(loop);

                        }
                    }
                },100);
        })

      } else 
      if (btnType == 1){ // Push to tab
        // Turn element into a button
        div.childNodes[0].remove();
        inDiv.className += " optionBtn1";
        inDiv.id="pushTabBtn";

      } else {

        inDiv.className += " optionSlider";
        inTxt.remove();
        const input = document.createElement("input");
        input.type = "text";
        input.className = "optionInput";
        const slider = document.createElement("input");
        slider.type = "range";
        slider.className="sideSlider";
        slider.addEventListener("mousemove",(e)=>{
            let val = e.target.value;
            input.value = val;
        })
        input.addEventListener("focusout",()=>{
            slider.value = input.value;
        })
        // Specific bits
        switch(title){
                case "Tab Length": 
                    input.placeholder = 4; 
                    input.value = 4; 
                    input.id="lengthInput";
                    slider.min = "1";
                    slider.max = "8";
                    break;
                case "Root Note <br>(0 = open E)": 
                    input.placeholder = 7; 
                    input.value = 7; 
                    input.id="rootInput";
                    slider.min = "0";
                    slider.max = "24";
                    break;
                case "BPM": 
                    input.placeholder = 150; 
                    input.value = 150; 
                    input.id="bpmInput";
                    slider.min = "0";
                    slider.max = "240";
                    break;
                case "Longest Note <br>(1,2,4,8) 1 longest":
                    input.placeholder = 4; 
                    input.value = 4; 
                    input.id="noteLengthInput";
                    slider.min = "1";
                    slider.max = "8";
                    break;
                case "Distortion":
                    input.placeholder = 0; 
                    input.value = 0; 
                    input.id="distortionInput";
                    slider.min = "0";
                    slider.max = "10";
                    break;
                    
                default: console.log(title);
            }
            slider.value = input.value;
        // input.placeholder = "0";//
        inDiv.append(input);
        inDiv.append(slider);

      }

    elmNumber ++; // just keeps track of individual elements
}
function makeDropDown(target,arr){
    let out = document.querySelector(target);
    const mainDiv = document.createElement("div");
    mainDiv.className = "dropDownMenu menuHide";
    mainDiv.id = "dropDown"+target.slice(10);
    out.append(mainDiv);
    for(let i = 0; i < arr.length; i++){
        let item = document.createElement("div");
        item.className = `elm${mainDiv.id}`;
        mainDiv.append(item);
            let text = document.createElement("p");
            let num = arr[i].length;
            if (num > 12){
                item.className += " menuLrg";
            }
            text.innerHTML = arr[i];

            item.addEventListener("click",(e)=>{
                let txtTarget = mainDiv.parentNode.childNodes[1].childNodes[0]; // Quite messy but gets the job done
                txtTarget.innerText = e.target.innerText;

                let target = e.target.className;
                let out;
                // Pretty much ignores the text, if text gets a class though this will need to be changed
                if (target == ""){
                    out = e.target.parentNode;
                } else {
                    out = e.target;
                }
                hideMenu(out.className);
            })

            item.append(text);
    }
}

function hideMenu(target){

    let pos = target.search("0");
    target = target.slice(pos);
    let menuTarget = document.querySelector(`#dropDown${target}`);

    menuTarget.classList.toggle("menuHide");
}

function inputArrayConvert(arr,type){
    let out = [];
    switch(type){
        case "instrument" : 
        case "scales" : 
            out = [];
            for (let i = 0; i < arr.length; i++){
                out.push(arr[i].name);
            }
            return out;
        case "instruments":
            out = [];
            for (let i = 0; i < arr.length; i++){
                out.push(arr[i].title);
            }
            return out;
        default : return arr;
    }
}

// Left Side
makeElm("","Push to Tab",navLeft,1);
makeElm("Tab Length","8",navLeft,-1);
makeElm("Tab Type","Bass Tab",navLeft,2,inputArrayConvert(instrums,"instrument"));
makeElm("Scale : ","Pentatonic Major",navLeft,0,inputArrayConvert(scales,"scales"));
makeElm("Root Note <br>(0 = open E)","2",navLeft,-1);
makeElm("BPM","2",navRight,-1);
makeElm("Longest Note <br>(1,2,4,8) 1 longest","4",navLeft,-1);
// Left drop down

// Right Side
makeElm("Instrument",instruments[0].title,navRight,0,inputArrayConvert(instruments,"instruments"));
makeElm("Distortion","8",navRight,-1);
// makeElm("Chorus","8",navRight,-1);
// makeElm("Phaser","8",navRight,-1);
// makeElm("Chorus","Off",navRight,0,);
// makeElm("Phaser","Off",navRight,0);
// makeElm("Reverb","Strong",navRight,0,["none","half","strong"]);

function getElmFromTitle(title,className = ".optionBox"){
    // Finds the element with the title, works no matter where the element is placed, title is case sensitive
    let root = document.querySelectorAll(className);
    let i = 0;
    for (; i < root.length;){
        if (root[i].childNodes[0].innerHTML === title){
            return root[i];
        } else {
            i ++;
        }
    }
}


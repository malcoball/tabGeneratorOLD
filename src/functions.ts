const getDomTargets = (tableClass:string,noteClass:string,tableInt:number)=>{
    const domTable =  document.querySelectorAll(tableClass)[tableInt];
    const domTab = domTable.querySelectorAll(noteClass);
    return domTab;
}
const noteHighlights = {
    single(tableClass:string,noteClass:string,tableInt:number,targetInt:number,className:string,remove:boolean){
        const domTab = getDomTargets(tableClass,noteClass,tableInt);
        const target = domTab[targetInt];

        if (remove === true) domTab.forEach(elm =>{elm.classList.remove(className)});
        // Handles error when trying to hightlight the longer notes. Might not be needed later on.
        if (target !== undefined) target.classList.add(className);
    },
    all(tableClass:string,noteClass:string,tableInt:number,className:string,remove:boolean){
        const domTab = getDomTargets(tableClass,noteClass,tableInt);

        if (remove === true) domTab.forEach(elm =>{elm.classList.remove(className)});
        else domTab.forEach(elm =>{elm.classList.add(className)});
    },
    allInterval(tableClass:string,noteClass:string,tableInt:number,className:string,bpm:number){
        const domTab = getDomTargets(tableClass,noteClass,tableInt);

        const bpmToTiming = 500 * (60 / bpm); 


        domTab.forEach((elm,int)=>{
            // Convert bpm to sec/1000
            
            const intervalTime = bpmToTiming * (int+1);
            
            setTimeout(()=>{
                elm.classList.add(className);
            },intervalTime)
        })
    },
    upto(tableClass:string,noteClass:string,tableInt:number,className:string,upto:number){
        const domTab = getDomTargets(tableClass,noteClass,tableInt);

        for (let i = 0; i < upto; i++){
            domTab[i].classList.add(className);
        }
    }
}

export {noteHighlights};
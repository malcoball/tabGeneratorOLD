const noteHighlights = {
    single(tableClass:string,noteClass:string,tableInt:number,targetInt:number,className:string,remove:boolean){
        const domTable =  document.querySelectorAll(tableClass)[tableInt];
        const domTab = domTable.querySelectorAll(noteClass);
        if (remove === true) domTab.forEach(elm =>{elm.classList.remove(className)});
        domTab[targetInt].classList.add(className);
        console.log("int : ",targetInt);
    },
    all(tableClass:string,noteClass:string,tableInt:number,className:string,remove:boolean){
        const domTable =  document.querySelectorAll(tableClass)[tableInt];
        const domTab = domTable.querySelectorAll(noteClass);
        if (remove === true) domTab.forEach(elm =>{elm.classList.remove(className)});
        else domTab.forEach(elm =>{elm.classList.add(className)});
    },
}

export {noteHighlights};
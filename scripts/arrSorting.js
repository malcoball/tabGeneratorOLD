function sortObjArr(arr){
    for (i = 0; i < arr.length; i++){
        for (j = 0; j < arr.length; j++){
            let a = arr[i].name; let b = arr[j].name;
            if (a < b){
                let temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}

function getArrFromName(name,out = "arr",arr = scales,start = 0,end = arr.length){

    // Doesn't exist in the array
    if (start > end) return false;

    // Get the middle index
    let mid = Math.floor((start+end)/2);

    // Compare mid to name
    if (arr[mid].name == name){
        switch (out){
            case "int" : return mid;
            case "arr" : return arr[mid];
        }
    }

    if (arr[mid].name > name){
        return getArrFromName(name,out,arr,start,mid-1);
    } else {
        return getArrFromName(name,out,arr,mid+1,end);
    }
}
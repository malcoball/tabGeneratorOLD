export interface tabSettings {
    tabLength: number;
    tabType: string;
    scale: string;
    smallTab: null;
    rootNote: number;
    bpm: number;
    distortion: number;
    handPosition: number;
    synth: string;
    noteLengths: number[];
}
export interface tabType {
        id : number;
        tab: {
            note: number;
            length: number;
        }[];
        activeNote: number;
        selected: number;
        name: string;
        settings: tabSettings;
}
export type tabContextType = {
    tabs: tabType[];
    updateTab : {
        add: () => void;
        remove: (id: number) => void;
        length : () => void;
        note :{
            change : (target:{note:number,tabId:number},value:{note:number,length:number})=> void;
            add : (target:number,value:{note:number,length:number})=> void;
            remove : (target:number) => void;
        }
    },
    getTab:(id:number) => typeType;
    updateSettings : {
        data : tabSettings,
        updateProperty : {
            byString : (propsName:string,value: string) =>void;
            byNumber : (propsName:string,value: number) =>void;
            byArr    : (propsName:string,value : [number,number]) =>void;
        },
        getProperty : {
            byString : (propsName:string) =>string;
            byNumber : (propsName:string) =>number;
            byArr    : (propsName:string) =>any; // Currently not sure, hence the any
        }
    },
    mainTab : {
        addSmall : (id:number)=> void;
    }
}
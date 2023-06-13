export const DropDownInputStr = (props:{title:string,values:string[],state:{value:string,setValue:React.Dispatch<React.SetStateAction<string>>}})=>{
    const radioChange = (e:React.ChangeEvent<HTMLSelectElement>)=>{
        props.state.setValue(e.target.value);
    }
    const items = props.values.map(elm =>{
        return <option value={elm}>{elm}</option>
    })
    return (
        <div className="downDownContainer">
            <span>{props.title} :</span>
            <select name="tabType" onChange={radioChange}>
                {items}
            </select>
        </div>
    )
}
export const DropDownInputNum = (props:{title:string,values:number[],state:{value:number,setValue:React.Dispatch<React.SetStateAction<number>>}})=>{
    const radioChange = (e:React.ChangeEvent<HTMLSelectElement>)=>{
        props.state.setValue(parseInt(e.target.value));
    }
    const items = props.values.map(elm =>{
        return <option value={elm}>{elm}</option>
    })
    return (
        <div className="downDownContainer">
            <span>{props.title} :</span>
            <select name="tabType" onChange={radioChange}>
                {items}
            </select>
        </div>
    )
}

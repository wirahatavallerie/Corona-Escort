import React, {useState} from 'react'

const Stuff = props =>{
    const [mount, setMount] = useState(0)

    const onChangeStuff = (type,name) =>{
        if(type === "plus"){
            setMount(mount+1)
        }else if(type === "minus"){
            if(mount>=1){
                setMount(mount-1)
            }
        }
        props.handlerChange(type,name)
    }

    const submitedCheck = () =>{
        if(props.sbmtd >= '1'){
            return true
        }else{
            return false
        }
    }
    return(
        <>
            <tbody>
                <tr className="row-4">
                    <td>{props.name}</td>
                    <td>{mount}</td>
                    <td><button className="plus" disabled={submitedCheck()} onClick={()=>{onChangeStuff("plus", props.name)}}>+</button></td>
                    <td><button className="min" disabled={submitedCheck() || mount === 0 ? true : false} onClick={()=>{onChangeStuff("minus", props.name)}}>-</button></td>
                </tr>
            </tbody>
        </>
    )
}


export default Stuff
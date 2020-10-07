import React, {useState} from 'react'
import Stuff from './Stuff'

const Stuffs = ()=>{
    const [list] = useState(['Mildliner','Tombow','Washi Tape','Post It'])
    const [mild, setMild] = useState(0)
    const [tombow, setTombow] = useState(0)
    const [washi, setWashi] = useState(0)
    const [post, setPost] = useState(0)
    const [haveSubmited, setHaveSubmited] = useState('')
    const [total, setTotal] = useState(0)
    const [message, setMessage] = useState('')
    const [listBought, setListBought] = useState('0')

    const showList = () =>{
        return {list}
    }

    const showTotal = () => {
        return (
        <div className="buyy">
            <div className="buyBox" onClick={()=>{setListBought(listBought+'1')}}>
                <span className="buy">You've Buy</span><br></br>
                <span className="buyMount">{total}</span><br></br>
                <span className="buyItem">item(s)</span><br></br>
            </div>
        </div>
        )
    }

    const showBoughtList = () => {
        return(
            <div className="overlay">
                <h2 className="title ove-ttl">Your Buy List</h2><span className="back" onClick={()=>{setListBought(listBought-'1')}}>Back</span>
                <table className="listTable table-sec">
                    <thead>
                        <tr>
                            <th className="row-head">Name</th>
                            <th className="row-head">Mount</th>
                        </tr>
                    </thead>
                    <tbody>
                            {
                                list.map((el)=>{
                                    if(el === "Mildliner" && mild >= 1){
                                        return (
                                            <tr className="row-4-2">
                                                <td>{el}</td>
                                                <td>{mild}</td>
                                            </tr>
                                        )
                                    }else if(el === "Tombow" && tombow >= 1){
                                        return(
                                            <tr className="row-4-2">
                                                <td>{el}</td>
                                                <td>{tombow}</td>
                                            </tr>
                                        )
                                    }else if(el === "Washi Tape" && washi >= 1){
                                        return(
                                            <tr className="row-4-2">
                                                <td>{el}</td>
                                                <td>{washi}</td>
                                            </tr>
                                        )
                                    }else if(el === "Post It" && post >= 1){
                                        return(
                                            <tr className="row-4-2">
                                                <td>{el}</td>
                                                <td>{post}</td>
                                            </tr>
                                        )
                                    }
                                })
                            }
                    </tbody>
                </table>
            </div>
        )
    }

    const submit = new Promise((resolve, reject)=>{
            resolve(showList())
            reject('disallowed')
        })

    const submited= ()=>{
        submit.then((res)=>{
            setMessage(message === ''? message + 'Thanks for Buying!!!' : 'Thanks for Buying!!!') 
            setHaveSubmited(haveSubmited === ''? haveSubmited + '1' : haveSubmited + '1')
            console.log(res.list)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const handlerChange = (type,name) =>{
        if(type === "plus"){
            if(name === "Mildliner"){
                setMild(mild+1)
                setTotal(total+1)
            }else if(name === "Tombow"){
                setTombow(tombow+1)
                setTotal(total+1)
            }else if(name === "Washi Tape"){
                setWashi(washi+1)
                setTotal(total+1)
            }else{
                setPost(post+1)
                setTotal(total+1)
            }
        }else{
            if(name === "Mildliner"){
                if(mild >= 1 && total >= 1){
                    setMild(mild-1)
                    setTotal(total-1)
                }
            }else if(name === "Tombow"){
                if(tombow >= 1 && total >= 1){
                    setTombow(tombow-1)
                    setTotal(total-1)
                }
            }else if(name === "Washi Tape"){
                if(washi >= 1 && total >= 1){
                    setWashi(washi-1)
                    setTotal(total-1)
                }
            }else{
                if(post >= 1 && total >= 1){
                    setPost(post-1)
                    setTotal(total-1)
                }
            }
        }
    }

    return(
        <>
        <div>
            <ul>
                <div>
                    <h2 className="title">Stuffs List </h2>
                    <h4 className="choose">Choose your item(s):</h4>
                    <hr className="line"></hr>
                    <table className="listTable">
                        <thead>
                            <tr>
                                <th className="row-head">Name</th>
                                <th className="row-head">Mount</th>
                                <th className="row-head">Increase</th>
                                <th className="row-head">Decrease</th>
                            </tr>
                        </thead>
                        {
                            list.map((el,index)=>{
                                return(
                                    <Stuff name={el} key={index} handlerChange={(type,name)=> handlerChange(type,name)} sbmtd={haveSubmited}/>
                                )
                            })
                        }
                    </table>

                    <button className="submit" onClick={()=>submited()}>Submit</button>
                    {haveSubmited >= '1'? showTotal() : '' }
                    <div className="buyy">
                        <h3 className="thanksGreet">{message}</h3>
                    </div>
                    {listBought === '01'? showBoughtList() : ''}
                </div>
            </ul>
        </div>
        </>
    )
}

export default Stuffs

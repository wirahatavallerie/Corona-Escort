import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'
import axios from 'axios'

const Register = ({history}) => {
    const [message, setMessage] = useState('')
    const [alertColor, setAlertColor] = useState('')
    const reg = () => {
        if(dataRegister.password === dataRegister.repeatPassword){
            axios({
                method: 'post',
                url: 'http://localhost:8000/api/register', 
                data: {
                    name: dataRegister.name,
                    username: dataRegister.username,
                    password: dataRegister.password
                }
            })
            .then((res) => {
                if(res.data.status){
                    history.push('/')
                    setAlertColor('succes')
                    setMessage(res.data.message)
                    alert(res.data.message)
                }else{
                    setAlertColor('danger')
                    setMessage(res.data.message)
                }
            })
            .catch((err) => {
                if(err.response.status === 401){
                    setAlertColor('danger')
                    setMessage(err.response.data.message)
                }
            })
        }else{
            alert('Password tidak sama')
        }
    }

    const [dataRegister, setDataRegister] = useState({
        name: '',
        username: '',
        password: '',
        repeatPassword: ''
    })
    
    const handlerChange = (event) => {
        setDataRegister({
            ...dataRegister, 
            [event.target.name]: event.target.value
        })
    }
    
    return(
    <div className="body-box">
        <div className="data-box">
            <div className="head">
                <h1 className="title title-bar"><span className="span title">Corona</span><br></br>Escort</h1>
            </div>
            <div className="data-title">Register</div>
            
            <div className="data-boxes reg">
                <div className="reg-box">
                    <h1 className="title title-bar login-bar"><span className="span title">Corona</span><br></br>Escort</h1>
                    {
                        message === '' ? '' : (
                            <div className={ alertColor === 'success' ? "success register-message" : "danger register-message"}>
                                <div className={ alertColor === 'success' ? "success-alert profile-alert" : "danger-alert profile-alert"}><FontAwesomeIcon className="alert-icon" icon={ alertColor === 'success' ? faCheck : faTimes} /> </div>
                                {message}
                            </div>
                        )
                    }
                    <div className="login-input input-boxes">
                        <div className="profile-name black">
                            Name
                        </div>
                        <input name="name" className="login-input-box" placeholder="Name" type="text" onChange={(event) => handlerChange(event)} />
                    </div>
                    <div className="login-input input-boxes">
                        <div className="profile-name black">
                            Username
                        </div>
                        <input name="username" className="login-input-box" placeholder="Username" type="text" onChange={(event) => handlerChange(event)} />
                    </div>
                    <div className="login-input input-boxes">
                        <div className="profile-name black">
                            Password
                        </div>
                        <input name="password" className="login-input-box" placeholder="Password" type="password" onChange={(event) => handlerChange(event)} />
                    </div>
                    <div className="login-input input-boxes">
                        <div className="profile-name black">
                            Repeat Password
                        </div>
                        <input name="repeatPassword" className="login-input-box" placeholder="Repeat Password" onChange={(event) => handlerChange(event)} type="password" />
                    </div>
                    <div className="login-input btn-log">
                        <button className="btn-login" onClick={() => reg()}>Register</button>
                    </div>
                    <div className="login-input btn-log">
                        <Link to="/"><button className="register-btn">Login</button></Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Register
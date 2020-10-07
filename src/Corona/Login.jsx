import React, { useState, useEffect, useContext} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons'
import {TestContext} from './Checked'
import axios from 'axios'
import {Link} from 'react-router-dom'


const Login = () => {
    const {isLogin} = useContext(TestContext)
    const [message, setMessage] = useState('')
    const [alertColor, setAlertColor] = useState('')
    const getProfile = () => {
        axios({
            method: 'post',
            url: 'http://localhost:8000/api/login',
            data: {
                username: dataLogin.username,
                password: dataLogin.password
            } 
        })
        .then(res => {
            if(res.data.status){
                localStorage.setItem('token', res.data.data.api_token)
                localStorage.setItem('username', res.data.data.username)
                window.location.reload()
            }else{
                setMessage(res.data.message)
                setAlertColor('danger')
            }

        })
        .catch(err => {
            if(err.response.status === 401){
                setMessage(err.response.data.message)
                setAlertColor('danger')
            }
        })
    }

    useEffect(()=>{
        if(isLogin){
            getProfile()
        }
    }, [isLogin])


    const [dataLogin, setDataLogin] = useState({
        username: '',
        password: ''
    })

    const handlerChange = (event) => {
        setDataLogin({...dataLogin, [event.target.name]: event.target.value})
    }

    return(    
    <div className="body-box">
        <div className="data-box">
            <div className="head">
                <h1 className="title title-bar"><span className="span title">Corona</span><br></br>Escort</h1>
            </div>
            <div className="data-title login-title">Login</div>
            
            <div className="data-boxes">
                <div className="login-box">
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
                            Username
                        </div>
                        <input name="username" className="login-input-box" onChange={(event)=> handlerChange(event)} placeholder="Username" type="text" />
                    </div>
                    <div className="login-input input-boxes">
                        <div className="profile-name black">
                            Password
                        </div>
                        <input name="password" className="login-input-box" onChange={(event)=> handlerChange(event)} placeholder="Password" type="password" />
                    </div>
                    <div className="login-input btn-log">
                        <button className="btn-login" onClick={() => getProfile()}>Login</button>
                    </div>
                    <div className="login-input btn-log">
                        <Link to="/register"><button className="register-btn">Register</button></Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Login 
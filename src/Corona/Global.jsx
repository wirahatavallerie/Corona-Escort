import React, {useState, useEffect, useContext} from 'react'
import {TestContext} from './Checked'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearchLocation, faUser, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const Global = () =>{
    const {isLogin, token, username} = useContext(TestContext)
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [name, setName] = useState('')
    const [setPassword] = useState('')
    const [profile, setProfile] = useState(false)
    const [profileClass, setProfileClass] = useState('profile-boxes hide')
    const [profileChange, setProfileChange] = useState(false)
    const [changePassword, setChangePassword] = useState(false)
    const [message, setMessage] = useState('')
    const [alertColor, setAlertColor] = useState('')

    const getData = () => {
        setIsLoading(true)
        axios.get("http://api.coronastatistics.live/all")
        .then(res => {
            if(res.data){
                console.log(res.data)
                setIsLoading(false)
                setData(res.data)
            }else{
                console.log(res)
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    const getProfile = () => {
        setMessage('')
        setIsLoading(true)
        axios.get('http://localhost:8000/api/profile', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            name: name,
            username: {username}
        })
        .then((res) => {
            setName(res.data.data.name)
            setPassword(res.data.data.password)
            setIsLoading(false)
        })
        .catch((err) => {
            alert('tidak dapat meload profile')
        })
    }

    const changeProfile = () => {
        axios({
            method: 'post',
            url: 'http://localhost:8000/api/profile/change', 
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: {
                name: newData.name
            }
        })
        .then((res) => {
            setProfileChange(false)
            setMessage('Update Profile Success!')
            setAlertColor('success')
            setName(newData.name)
        })
        .catch((err) => {
            if(err.response.status === 401 || err.response.status === 422){
                setMessage('Update Profile Unsuccess!')
                setAlertColor('danger')
            }
        })
    }

    const [newData, setNewData] = useState({
        name: ''
    })

    const handlerChange = (event) => {
        setNewData({
            ...newData,
            [event.target.name]: event.target.value
        })
    }

    const getChangePassword = () => {
        axios({
            method: 'post',
            url: 'http://localhost:8000/api/profile/change/password',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            data: {
                password: dataPassword.password,
                newPassword: dataPassword.newPassword,
                repeatPassword: dataPassword.repeatPassword
            }
        })
        .then((res)=>{
            setMessage('Update Password Success!')
            setChangePassword(false)
            setAlertColor('success')
            setDataPassword({
                password: '',
                newPassword: '',
                repeatPassword: ''
            })
        })
        .catch((err) => {
            setMessage('Update Password Unuccess!')
            setAlertColor('danger')
        })
    }

    const [dataPassword, setDataPassword] = useState({
        password: '',
        newPassword: '',
        repeatPassword: ''
    })

    const handlerPasswordChange = (event) => {
        setDataPassword({
            ...dataPassword,
            [event.target.name]: event.target.value
        })
    }

    const logOut = () =>{
        axios.get('http://localhost:8000/api/logout', {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        })
        .then((res)=>{
            localStorage.clear()
            window.location.reload()
        })
        .catch((err)=>{
            if(err.response.status === 401){
                alert(err.response.data.message)
            }
        })
    }

    useEffect(()=>{
        getData()
        getProfile()
    }, [isLogin])

    const showProfile = () => {
        if(profile){
            setProfile(false)
            setProfileClass('profile-boxes hide')
        }else{
            setProfile(true)
            setChangePassword(false)
            setProfileChange(false)
            setProfileClass('profile-boxes show')
            setMessage('')
        }
    }

    const back = () => {
        setProfileChange(false)
        setChangePassword(false)
        setMessage('')
    }

    const formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
    }

    const profileBox = () => {
        if(profileChange){
            return(<>
                <div className="input-boxes show">
                    <div className="profile-name show">
                        Name
                    </div>
                    <input autoFocus className="input-box show" type="text" onChange={(event) => handlerChange(event)} name="name" placeholder="Name" value={newData.name} />
                </div>
            </>
            )
        }else if(changePassword){
                return(
                        <>
                            <div className="input-boxes show">
                                <div className="profile-name show">
                                    Password
                                </div>
                                <input className="input-box show" value={dataPassword.password} type="password" onChange={(event) => handlerPasswordChange(event)} name="password" placeholder="Password" />
                            </div>
                            <div className="input-boxes show">
                                <div className="profile-name show">
                                    New Password
                                </div>
                                <input className="input-box show" value={dataPassword.newPassword} type="password" name="newPassword" onChange={(event) => handlerPasswordChange(event)} placeholder="New Password"/>
                            </div>
                            <div className="input-boxes show">
                                <div className="profile-name">
                                    Repeat New Password
                                </div>
                                <input className="input-box" type="password" name="repeatPassword" onChange={(event) => handlerPasswordChange(event)} placeholder="Repeat New Password"/>
                            </div>
                        </> 
                )
        }else{
            return(
                <>
                    <div className="input-boxes show">
                        <div className="profile-name show">
                            Name
                        </div>
                        <input className="input-box show" type="text" value={name} disabled />
                    </div>
                    <div className="input-boxes show">
                        <div className="profile-name show">
                            Username
                        </div>
                        <input className="input-box show" type="text" value={username} disabled />
                    </div>
                </>
            )
        }
    }

    return (
        <div>
            {
                isLoading ? (
                    <>
                        <ul className="ul-load">
                            <div className="li-load"></div>
                            <div className="li-load"></div>
                            <div className="li-load"></div>
                            <div className="li-load"></div>
                            <div className="li-load"></div>
                        </ul>
                    </>
                ) : 
                <>
                <div className="body-box">
                    <div className="data-box">
                        <div className="head">
                        <h1 className="title title-bar"><span className="span title">Corona</span><br></br>Escort</h1>
                                    <div className="su-box">
                                        <span className="user-box su-content logout-btn" onClick={()=> logOut()}>Logout</span>
                                        <span onClick={() => showProfile()} className="user-box su-content su-username pointer">{username}<FontAwesomeIcon className="user-i" icon={faUser} /></span>
                                        <div className={profileClass}>
                                             <div className="profile-box" >
                                                 <div onClick={() => showProfile()} className="close">
                                                     <FontAwesomeIcon icon={faTimes} className="close" />
                                                 </div>
                                                 {
                                                     message !== '' ? (
                                                        <div className={ alertColor === 'success' ? "success profile-message" : "danger profile-message"}>
                                                            <div className={ alertColor === 'success' ? "success-alert profile-alert" : "danger-alert profile-alert"}><FontAwesomeIcon icon={ alertColor === 'success' ? faCheck : faTimes} /> </div>
                                                            {message}
                                                        </div>
                                                     ) : ''
                                                 }
                                                {profileBox()}
                                                {
                                                    changePassword ? (
                                                        <>
                                                            <div className="back-prof-btn" onClick={() => back()} >Back</div>
                                                            <div className="login-input btn-log" onClick={() => getChangePassword()}>
                                                                <div className="btn-login prof-btn">Save Changes</div>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        profileChange ? (
                                                            <>
                                                                <div className="back-prof-btn" onClick={() => back()} >Back</div>
                                                                <div className="login-input btn-log" onClick={() => changeProfile()}>
                                                                    <div className="btn-login prof-btn">Save Changes</div>
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <div className="change-pass-btn" onClick={() => {
                                                                            setChangePassword(true)
                                                                            setMessage('')
                                                                        } 
                                                                    } >Change Password</div>
                                                                <div className="login-input btn-log" onClick={() => { 
                                                                            setProfileChange(true)
                                                                            setMessage('')
                                                                        } 
                                                                    }>
                                                                    <div className="btn-login prof-btn">Change Profile</div>
                                                                </div>
                                                            </>
                                                        )
                                                    )
                                                }
                                             </div>
                                        </div>
                                    </div>
                        </div>
                        <div className="data-title g-title">Global</div>
                        
                        <div className="data-boxes">
                            <div className="boxes global-boxes g-cases">
                                <p className="title-boxes global-title">Cases</p>
                                <p className="score-boxes global-score">{data.cases ? formatNumber(data.cases) : '0'}</p>
                            </div>
                            <div className="boxes global-boxes g-deaths">
                                <p className="title-boxes global-title">Deaths</p>
                                <p className="score-boxes global-score">{data.deaths ? formatNumber(data.deaths) : '0'}</p>
                            </div>
                            <div className="boxes global-boxes g-recovered">
                                <p className="title-boxes global-title">Recovered</p>
                                <p className="score-boxes global-score">{data.recovered ? formatNumber(data.recovered) : '0'}</p>
                            </div>
                            <div className="boxes global-boxes g-updated">
                                <p className="title-boxes global-title">Updated</p>
                                <p className="score-boxes global-score">{data.updated ? formatNumber(data.updated) : '0'}</p>
                            </div>
                            <Link to="/">
                                <div className="boxes global-boxes g-country">
                                    <p className="title-boxes global-title">Cases/</p>
                                    <p className="score-boxes global-score">Country<FontAwesomeIcon className="g-icon" icon={faSearchLocation}></FontAwesomeIcon></p>
                                </div>
                            </Link>
    
                        </div>
                    </div>
                </div>
                </>
            }
        </div>
        
    )
}

export default Global
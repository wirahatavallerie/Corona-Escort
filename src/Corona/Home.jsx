import React, {useState, useEffect, useContext} from 'react'
import {TestContext} from './Checked'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faGlobe, faUser, faTimes, faCheck, faSignOutAlt, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const Home = props =>{
    const {isLogin, token, username} = useContext(TestContext)
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [country, setCountry] = useState('Indonesia')
    const [oneMil, setOneMil] = useState(true)
    const [find, setFind] = useState(true)
    const [name, setName] = useState('')
    const [profile, setProfile] = useState(false)
    const [profileClass, setProfileClass] = useState('profile-boxes hide')
    const [profileChange, setProfileChange] = useState(false)
    const [changePassword, setChangePassword] = useState(false)
    const [message, setMessage] = useState('')
    const [alertColor, setAlertColor] = useState('')
    const [searching, setSearching] = useState(true)

    const getData = () => {
        setIsLoading(true)
        axios.get(`http://api.coronastatistics.live/countries/${country}`)
        .then(res => {
            if(res.data){
                setData(res.data)     
                setIsLoading(false) 
                setFind(true)
            }else{
                setFind(false)
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
            setMessage(res.data.message)
            setAlertColor('success')
            setName(newData.name)
        })
        .catch((err) => {
            if(err.response.status === 401 || err.response.status === 422){
                setMessage(err.response.data.message)
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
            setMessage(res.data.message)
            setChangePassword(false)
            setAlertColor('success')
            setDataPassword({
                password: '',
                newPassword: '',
                repeatPassword: ''
            })
        })
        .catch((err) => {
            setMessage(err.response.data.message)
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

    const search = (event) => {
        // setCountry(event.target.value)
        if(event.which === 13){
            getData()
        }else{
            setCountry(event.target.value)
        }
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
        if(isLogin){
            getData()
            getProfile()
        }
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
            setDataPassword({
                password: '',
                newPassword: '',
                repeatPassword: ''
            })
        }
    }

    const formatNumber = (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
    }

    const back = () => {
        setProfileChange(false)
        setChangePassword(false)
        setMessage('')
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

    return(
        <>
            {
                find ? 
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
                    ): (
                    <>
                        <div className="body-box">
                            <div className="data-box scroll">
                                <div className="head">
                                    {
                                        searching ? (
                                            <>
                                            <h1 className="title title-bar icon"><span className="span title"></span><br></br></h1>
                                            <span className="user-box su-content back-i" onClick={()=> setSearching(false)}><FontAwesomeIcon icon={faArrowLeft} /></span>
                                            <div className="su-box su-box-nav">
                                                <div className="search-box search-box-nav su-content">
                                                    <input type="text" name="country" onKeyPress={(event) => search(event)} onChange={(event) => search(event)} className="search-input search-input-nav" placeholder="Search..."></input>
                                                    <div className="search-right search-right-nav" onClick={getData}>
                                                        <span className="search-btn serach-btn-nav"><FontAwesomeIcon className="i-search" icon={faSearch} /></span>
                                                    </div>
                                                </div>
                                            </div>
                                            </>
                                        ) : (
                                            <>
                                            <h1 className="title title-bar"><span className="span title">Corona</span><br></br>Escort</h1>
                                            <div className="su-box">
                                                <span className="user-box su-content logout-btn word" onClick={()=> logOut()}>Logout</span>
                                                <span className="user-box su-content logout-btn icon i-box" onClick={()=> logOut()}><FontAwesomeIcon icon={faSignOutAlt} /></span>
                                                <span onClick={() => showProfile()} className="user-box su-content su-username pointer word">{username}<FontAwesomeIcon className="user-i" icon={faUser} /></span>
                                                <span onClick={() => showProfile()} className="user-box i-box su-content su-username pointer icon"><FontAwesomeIcon className="user-i" icon={faUser} /></span>
                                                <div className={profileClass}>
                                                     <div className="profile-box" >
                                                         <div onClick={() => showProfile()} className="close">
                                                             <FontAwesomeIcon icon={faTimes} className="close" />
                                                         </div>
                                                         {
                                                             message !== '' ? (
                                                                <div className={ alertColor === 'success' ? "success profile-message" : "danger profile-message"}>
                                                                    <div className={ alertColor === 'success' ? "success-alert profile-alert" : "danger-alert profile-alert"}><FontAwesomeIcon className="alert-icon" icon={ alertColor === 'success' ? faCheck : faTimes} /> </div>
                                                                    {message}
                                                                </div>
                                                             ) : ''
                                                         }
                                                        {profileBox()}
                                                        {
                                                            changePassword ? (
                                                                <>
                                                                    <div className="back-prof-btn" onClick={() => back()} >Back</div>
                                                                    <div className="login-input btn-log-prof" onClick={() => getChangePassword()}>
                                                                        <div className="btn-login prof-btn">Save Changes</div>
                                                                    </div>
                                                                </>
                                                            ) : (
                                                                profileChange ? (
                                                                    <>
                                                                        <div className="back-prof-btn" onClick={() => back()} >Back</div>
                                                                        <div className="login-input btn-log-prof" onClick={() => changeProfile()}>
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
                                                                        <div className="login-input btn-log-prof" onClick={() => { 
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
                                                <div className="search-box su-content word">
                                                    <input type="text" name="country" onKeyPress={(event) => search(event)} onChange={(event) => search(event)} className="search-input" placeholder="Search..."></input>
                                                    <div className="search-right" onClick={getData}>
                                                        <span className="search-btn"><FontAwesomeIcon className="i-search" icon={faSearch} /></span>
                                                    </div>
                                                </div>
                                                <div className="search-box su-content icon">
                                                    <div className="search-right" onClick={()=> setSearching(true)}>
                                                        <span className="search-btn"><FontAwesomeIcon className="i-search" icon={faSearch} /></span>
                                                    </div>
                                                </div>
                                            </div>
                                            </>
                                        )
                                    }
                                </div>
                                <div className="data-boxes">
                                    <div className="cases boxes">
                                        <p className="title-boxes">Cases</p>
                                        <p className="score-boxes">{data.cases ? formatNumber(data.cases) : '0'}</p>
                                        <p className="today-boxes">{data.todayCases ? formatNumber(data.todayCases) : '0'} today</p>
                                    </div>
                                    <div className="deaths boxes">
                                        <p className="title-boxes">Deaths</p>
                                        <p className="score-boxes">{data.deaths ? formatNumber(data.deaths) : '0'}</p>
                                        <p className="today-boxes">{data.todayDeaths ? formatNumber(data.todayDeaths) : '0'} today</p>
                                    </div>
                                    <div className="recovered boxes">
                                        <p className="title-boxes">Recovered</p>
                                        <p className="score-boxes">{data.recovered ? formatNumber(data.recovered) : '0'}</p>
                                        <p className="today-boxes">{data.todayRecovered ? formatNumber(data.recovered) : '0'} today</p>
                                    </div>
                                    <div className="active boxes active-boxes">
                                        <p className="title-boxes">Active</p>
                                        <p className="score-boxes-active">{data.active ? formatNumber(data.active) : '0'}</p>
                                    </div>
                                    <div className="data-title">{data.country}</div>

                                    
                                    <div className="per-box per-box-re">
                                        <div className="per-btn">
                                            <div onClick={()=> setOneMil(true)} className={oneMil ? 'active per one-mil' : 'per one-mil'}>Per One Million</div>
                                            <div onClick={()=> setOneMil(false)} className={oneMil ? 'per people' : 'active per people'}>Per People</div>
                                        </div>
                                    </div>

                                    {
                                        oneMil ? (
                                            <>
                                                <div className="per-box per-data">
                                                    <div className="per-detail-box">
                                                        <div className="per-detail-data per-detail">Active</div>
                                                        <div className="per-score-data per-detail">{data.activePerOneMillion ? formatNumber(data.activePerOneMillion) : '0'}</div>
                                                    </div>
                                                    <div className="per-detail-box">
                                                        <div className="per-detail-data per-detail">Cases</div>
                                                        <div className="per-score-data per-detail">{data.casesPerOneMillion ? formatNumber(data.casesPerOneMillion) : '0'}</div>
                                                    </div>
                                                    <div className="per-detail-box">
                                                        <div className="per-detail-data per-detail">Deaths</div>
                                                        <div className="per-score-data per-detail">{data.deathsPerOneMillion ? formatNumber(data.deathsPerOneMillion) : '0'}</div>
                                                    </div>
                                                    <div className="per-detail-box">
                                                        <div className="per-detail-data per-detail">Recovered</div>
                                                        <div className="per-score-data per-detail">{data.recoveredPerOneMillion ? formatNumber(data.recoveredPerOneMillion) : '0'}</div>
                                                    </div>
                                                    <div className="per-detail-box">
                                                        <div className="per-detail-data per-detail">Tests</div>
                                                        <div className="per-score-data per-detail">{data.testsPerOneMillion ? formatNumber(data.testsPerOneMillion) : '0'}</div>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="per-box per-data">
                                                    <div className="per-detail-box">
                                                        <div className="per-detail-data per-detail">Case</div>
                                                        <div className="per-score-data per-detail">{data.oneCasePerPeople ? formatNumber(data.oneCasePerPeople) : '0'}</div>
                                                    </div>
                                                    <div className="per-detail-box">
                                                        <div className="per-detail-data per-detail">Death</div>
                                                        <div className="per-score-data per-detail">{data.oneDeathPerPeople ? formatNumber(data.oneDeathPerPeople) : '0'}</div>
                                                    </div>
                                                    <div className="per-detail-box">
                                                        <div className="per-detail-data per-detail">Test</div>
                                                        <div className="per-score-data per-detail">{data.oneTestPerPeople ? formatNumber(data.oneTestPerPeople) : '0'}</div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    }
                                    
                                    
                                    <div className="country-info">
                                        <div className="country">Data</div>
                                    </div>
                                    <div className="country-data">
                                        <div className="population box">
                                            <p className="population-boxes country-data-box">Population</p>
                                            <p className="population-boxes">{data.population ? formatNumber(data.population) : '0'}</p>
                                        </div>
                                        <div className="test box">
                                            <p className="test-boxes country-data-box">Tests</p>
                                            <p className="test-boxes">{data.tests ? formatNumber(data.tests) : '0'}</p>
                                        </div>
                                        <div className="updated box">
                                            <p className="updated-boxes country-data-box">Updated</p>
                                            <p className="updated-boxes">{data.updated ? formatNumber(data.updated) : '0'}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <Link to="/global"><FontAwesomeIcon icon={faGlobe} className="i-globe" /></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>)
                : (
                    <div className="body-box">
                        <div className="data-box">
                            <div className="head">
                                <h1 className="title title-bar"><span className="span title">Corona</span><br></br>Escort</h1>
                                <div className="search-box">
                                    <input type="text" name="country" onChange={(event) => search(event)} className="search-input" placeholder="Search..."></input>
                                    <div className="search-right" onClick={getData}>
                                        <span className="search-btn"><FontAwesomeIcon className="i-search" icon={faSearch} /></span>
                                    </div>
                                </div>
                            </div>
                            <div className="alert">
                                Can't find the data, please make sure you write the right country name!
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Home
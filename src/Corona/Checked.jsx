import React, {useState, createContext} from 'react'
import Login from './Login'

export const TestContext = createContext({
    token: '',
    username: ''
})

const Checked = ({children}) => {

    const [token] = useState(
        localStorage.getItem('token')
    )

    const [username] = useState(
        localStorage.getItem('username')
    )

    if(token){
        return(
            <TestContext.Provider value={{isLogin: token ? true : false, token: token, username: username}}>
                {children}
            </TestContext.Provider>
        )
    }

    return(
        <Login />
    )
}

export default Checked
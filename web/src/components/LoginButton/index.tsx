import React from 'react'
import { useHistory } from 'react-router-dom'

import './styles.css'

const LoginButton: React.FC = () => {
    const history = useHistory()

    function handleNavigateToLogin() {
        history.push('/login')
    }

    return <button onClick={handleNavigateToLogin} className='black-button login-btn' >Login</button>
}

export default LoginButton
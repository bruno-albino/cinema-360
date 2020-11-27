import React from 'react'
import { useHistory } from 'react-router-dom'
import sessionsRepository from '../../repositories/sessions'

import './styles.css'

const LogoutButton: React.FC = () => {
    const history = useHistory()

    async function handleLogout() {
        await sessionsRepository.logout()
        history.push('')
    }

    return <button id='logout-btn' onClick={handleLogout} className='black-button' >Sair</button>
}

export default LogoutButton
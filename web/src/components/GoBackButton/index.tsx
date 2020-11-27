import React from 'react'
import { useHistory } from 'react-router-dom'

import './styles.css'

const GoBackButton: React.FC = () => {
    const history = useHistory()

    return <button id='go-back-btn' className='black-button' onClick={history.goBack}>Voltar</button>
}

export default GoBackButton
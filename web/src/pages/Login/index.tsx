import React, { FormEvent, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import sessionsRepository from '../../repositories/sessions'
import './styles.css'

const Login: React.FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const isLogged = !!localStorage.getItem('token')
    const history = useHistory()

    useEffect(() => {
        if(isLogged) {
            history.push('/')
        }
    }, [])

    async function handleSubmit(e: FormEvent<HTMLElement> ) {
        e.preventDefault()

        try {
            const session = await sessionsRepository.login({
                email,
                password
            })
            
            if(session.auth) {
                localStorage.setItem('token', session.accessToken)
                localStorage.setItem('refreshToken', session.refreshToken)
                handleNextPage()
            }
        } catch(err) {
            alert(err.response.data.message)
        }
    }

    function handleNextPage() {
        const search = window.location.search;
        const params = new URLSearchParams(search); 
        const next = params.get('next');
        console.log(next)
        if(!!next) {
            return history.push(next)
        }

        history.push('')
    }

    function handleNavigateToHome() {
        history.push('')
    }

    return (
        <div id='login-page'>
            <button onClick={handleNavigateToHome} className='home-button black-button'>Início</button>
            <form onSubmit={handleSubmit}>
                <h1>Cinema-360</h1>
                <fieldset>
                    <label htmlFor="email">E-mail: </label>
                    <input type="email" id='email' value={email} onChange={e => setEmail(e.target.value)}/>
                    
                    <label htmlFor="password">Senha: </label>
                    <input type="password" id='password' value={password} onChange={e => setPassword(e.target.value)}/>
                </fieldset>
                <footer>
                    <button type='submit'>Entrar</button>
                </footer>
            </form>
        </div>
    )
}

export default Login
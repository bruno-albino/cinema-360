import React, { FormEvent, useState } from 'react'
import { useHistory } from 'react-router-dom'
import sessionsRepository from '../../repositories/sessions'
import './styles.css'

const Login: React.FC = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const history = useHistory()

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
                alert('foi')
                handleNavigateToHome()
            }
        } catch(err) {
            alert(err.response.data.message)
        }
    }

    function handleNavigateToHome() {
        const search = window.location.search;
        const params = new URLSearchParams(search); 
        const next = params.get('next');
        console.log(next)
        if(!!next) {
            return history.push(next)
        }

        history.push('')
    }

    return (
        <div id='login-page'>
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
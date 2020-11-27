import React from 'react'
import GoBackButton from '../GoBackButton'
import LoginButton from '../LoginButton'
import LogoutButton from '../LogoutButton'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {

}
const Container: React.FC<ContainerProps> = ({ children, ...rest }) => {
    const isLogged = !!localStorage.getItem('token')
    const isHomePage = window.location.pathname === '/'
    return (
        <div id='container'>
            <div {...rest}>
                {!isHomePage && <GoBackButton />}
                {isLogged ? <LogoutButton /> : <LoginButton />}
                {children}
            </div>
        </div>
    )
}

export default Container
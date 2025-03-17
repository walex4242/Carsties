import React from 'react'
import Search from './Search'
import Logo from './Logo'
import LoginButton from './LoginButton'
import { getCurrentUser } from '../actions/authActions'
import UserActions from './UserActions'

export default async function Navbar() {
    const user = await getCurrentUser();
    return (
        <header
            className='sticky top-0 z-50 flex flex-wrap justify-between items-center bg-white p-4 md:p-5 shadow-md w-full'
        >
            <Logo />
            <Search />
            {user ? (
                <UserActions user={user} />
            ) : (
                <LoginButton />
            )}
        </header>
    )
}
"use client"
import { signIn } from 'next-auth/react'
import { Button } from 'flowbite-react'
import React from 'react'

export default function LoginButton() {
    return (
        <Button outline onClick={() => signIn('id-server', { callbackurl: '/' }, { prompt: 'login' })}>
            Login
        </Button>
    )
}

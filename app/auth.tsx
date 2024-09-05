'use client'

import { signIn, signOut } from 'next-auth/react'

export const LoginButton = () => {
  return (
    <button
      onClick={() => signIn()}
      className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300 ease-in-out mr-2"
    >
      Entrar
    </button>
  )
}

export const LogoutButton = () => {
  return (
    <button
      onClick={() => signOut()}
      className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition duration-300 ease-in-out"
    >
      Sair
    </button>
  )
}
'use client'

import { useSession } from 'next-auth/react'

export const User = () => {
  const { data: session } = useSession()
  const json = JSON.stringify(session, null, 2);
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        { json != undefined ? 'Bem-vindo, ' + JSON.parse(json).user?.username + '!' : "‎"}
      </h1>
    </div>
  )
}
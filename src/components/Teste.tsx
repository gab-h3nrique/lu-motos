"use client"

import Button from '@/components/elements/Button'
import useApp from '@/hooks/useApp'
import React, { memo } from 'react'

const Teste = () => {

    // const { user, setUser } = useUser()
    const { user, setUser } = useApp()

    console.log('Teste redering...')


    return (

        <div className='flex flex-col'>

            <div className='text-color-1'>user: {user && user?.name}</div>

            <Button onClick={() => setUser({ name: 'gabriel', email: 'hehe', id: 1, role: 100, image: 'hehe' })} > <span>setUser</span></Button>

        </div>
        
    )


}

export default memo(Teste)
"use client"

import { UserProvider } from '@/contexts/UserContext'
import useApp from '@/hooks/useApp'
import useGlobal from '@/hooks/useApp'
import React, { memo, useState } from 'react'
import Teste from '../../components/Teste'
import Button from '@/components/elements/Button'

const page = () => {

    const { user1, setUser1 } = useApp()
    
    const [ selected, setSelected ] = useState('')


    console.log('Page redering...')

    return (

        <div className='flex flex-col'>

            <input onChange={(e)=> setSelected(e.target.value)} value={selected} type="text" />

            
            <div className='text-color-1'>user1: {user1 && user1?.name}</div>

            <Button onClick={() => setUser1({ name: 'gabriel' })} > <span>setUser1</span></Button>

            <Teste />

        </div>
        
    )


}

export default memo(page)
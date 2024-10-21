"use client"

import { UserProvider } from '@/contexts/UserContext'
import useApp from '@/hooks/useApp'
import useGlobal from '@/hooks/useApp'
import React, { memo, useState } from 'react'
import Button from '@/components/elements/Button'
import Select from '@/components/elements/Select'
import Modal from '@/components/modals/Modal'
// import Pulsar from 'pulsar-socket'
import Input from '@/components/elements/Input'

// const socket = Pulsar('ws://138.0.172.170:3001/pool/pulsar-cm26sbz9e0000i70i0v4z2w19', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicHVsc2FyIiwiaWF0IjoxNzI4Nzc1NTYwfQ.rWZ0L3G49INSlF9jIvylXEtpcEKS78cIRU9oX6m2YJA')
const page = () => {

    const [ message , setMessage ] = useState('')

    const [ array , setArray ] = useState<string[]>([])

    // socket.on('chat', ({ message }) => setArray(prev => ([...prev, message])))


    function send() {

        // socket.emit('chat', { message })

        setMessage('')

    }

    return (

        <div className={`gap-1 w-full h-fit flex-col relative overflow-hidden flex`}>

            <div className='flex flex-col gap-2 w-full'>

                {
                    array && array.length && array.map((e, i) => (
                        <span key={i} className='p-2 w-fit border rounded-full text-color-2 dark: text-color-2-dark'>{e}</span>
                    ))
                }


            </div>

            <div className='flex gap-2'>
                <Input type='text' onChange={(e: any) => setMessage(prev => e.target.value)} value={message}/>
                <Button onClick={send} className='flex justify-center bg-primary text-color-2 min-w-[82px]'>
                    Enviar
                </Button>
            </div>
            
        </div>
        
    )


}

export default memo(page)
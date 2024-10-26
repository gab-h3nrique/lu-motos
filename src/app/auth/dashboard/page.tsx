"use client"

import { UserProvider } from '@/contexts/UserContext'
import useApp from '@/hooks/useApp'
import useGlobal from '@/hooks/useApp'
import React, { memo, Suspense, useState } from 'react'
import Button from '@/components/elements/Button'
import Select from '@/components/elements/Select'
import Modal from '@/components/modals/Modal'
// import Pulsar from 'pulsar-socket'
import Input from '@/components/elements/Input'
import Loading from '@/components/Loading'
import { Description, Subtitle } from '@/components/texts/Texts'
import { useRouter } from 'next/navigation'
import Svg from '@/components/icons/Svg'

// const socket = Pulsar('ws://138.0.172.170:3001/pool/pulsar-cm26sbz9e0000i70i0v4z2w19', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoicHVsc2FyIiwiaWF0IjoxNzI4Nzc1NTYwfQ.rWZ0L3G49INSlF9jIvylXEtpcEKS78cIRU9oX6m2YJA')
const page = () => {

    const router = useRouter()

    return (

        <Suspense fallback={<Loading/>}>
            <div className={`gap-1 w-full h-fit flex-col relative overflow-hidden flex`}>
    
            <Subtitle className='font-semibold'>Dashboard</Subtitle>
    
            <Description onClick={router.back} className='flex gap-1 cursor-pointer w-fit'>
                <Svg.Angle className='w-4 h-4 fill-color-1 dark:fill-color-1-dark -rotate-90 mt-[.25rem]'/>
                voltar
            </Description>
    
            <section className='mt-3 w-full h-full flex flex-col gap-4'>

                <Description className='m-auto'>Em desenvolvimento...</Description>

            </section>
    
    
            </div>
        </Suspense>
        
    )


}

export default memo(page)
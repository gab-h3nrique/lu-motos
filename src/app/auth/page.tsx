"use client"

import { UserProvider } from '@/contexts/UserContext'
import React, { memo, Suspense, useState } from 'react'
import Button from '@/components/elements/Button'
import { Description, Subtitle, Title } from '@/components/texts/Texts'
import Svg from '@/components/icons/Svg'
import { useRouter } from 'next/navigation'
import Loading from '@/components/Loading'

const Page = () => {

    const router = useRouter()

    return (

        <Suspense fallback={<Loading/>}>
            <div className='p-4 gap-1 w-full h-full flex flex-col'>

                <Subtitle className='font-semibold'>Home</Subtitle>
    
                <Description onClick={router.back} className='flex gap-1 cursor-pointer'>
                <Svg.Angle className='w-4 h-4 fill-color-1 dark:fill-color-1-dark -rotate-90 mt-[.25rem]'/>
                voltar
                </Description>
    
                <section className='mt-3 flex flex-wrap gap-4'>
        
                <div className=" border dark:border-dark bg-background-2 dark:bg-background-2-dark flex flex-col p-4 gap-2 w-80 rounded-2xl">
        
                    <Subtitle className="">Atendimentos</Subtitle>
        
                    <p className="description text-color-1 dark:text-color-1-dark">Crie ou finalize um novo atendimento</p>
        
                    <Button onClick={() => router.push('/auth/atendimentos')} className='mt-3 ml-auto text-color-2 dark:text-color-2-dark'>Acessar</Button>
        
                </div>
        
                <div className=" border dark:border-dark bg-background-2 dark:bg-background-2-dark flex flex-col p-4 gap-2 w-80 rounded-2xl">
        
                    <Subtitle className="">Estoque</Subtitle>
        
                    <p className="description text-color-1 dark:text-color-1-dark">Gerencie seu estoque</p>
        
                    <Button onClick={() => router.push('/auth/estoque')} className='mt-3 ml-auto text-color-2 dark:text-color-2-dark'>Acessar</Button>
        
                </div>

                <div className=" border dark:border-dark bg-background-2 dark:bg-background-2-dark flex flex-col p-4 gap-2 w-80 rounded-2xl">
        
                    <Subtitle className="">Dashboard</Subtitle>
        
                    <p className="description text-color-1 dark:text-color-1-dark">Veja os resultados dos seus atendimentos</p>
        
                    <Button onClick={() => router.push('/auth/dashboard')} className='mt-3 ml-auto text-color-2 dark:text-color-2-dark'>Acessar</Button>
        
                </div>
        
                </section>
    
            </div>
        </Suspense>
        
    )


}

export default memo(Page)
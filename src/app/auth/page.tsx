"use client"

import { UserProvider } from '@/contexts/UserContext'
import React, { memo, useState } from 'react'
import Button from '@/components/elements/Button'
import { Description, Subtitle, Title } from '@/components/texts/Texts'

const Page = () => {



    return (

        <div className='p-4 gap-4 w-full h-full flex flex-col'>

            <Subtitle className='font-semibold'>Home</Subtitle>

            <section className='flex gap-2'>

                <div className="border dark:border-dark bg-background-2 dark:bg-background-2-dark flex flex-col p-4 gap-2 w-80 rounded-2xl">

                    <h1 className="subtitle text-color-1 dark:text-color-1-dark"><b className='text-primary mr-3'>45</b>Novos atendimentos</h1>

                    <p className="description text-color-1 dark:text-color-1-dark">Clique para inic</p>
                    <span className="label text-color-1 dark:text-color-1-dark w-fit bg-background-1 dark:bg-background-1-dark rounded-lg px-1 py-2">any-link-click-here.com.br</span>

                    <Button onClick={()=> console.log('hehehe')} className="ml-auto">
                        <Description>teste</Description>
                    </Button>

                </div>

            </section>

        </div>
        
    )


}

export default memo(Page)
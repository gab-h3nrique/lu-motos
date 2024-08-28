import Aside from '@/components/Aside'
import Header from '@/components/Header'
import { AppProvider } from '@/contexts/AppContext'
import { UserProvider } from '@/contexts/UserContext'
import React from 'react'

interface Props {

    children: React.ReactNode

}

export default function layout({children}: Props) {


    return (

        <AppProvider>

            <section className='flex w-full h-full flex-col'>

                <Header/>

                <section className={'flex w-full h-full overflow-hidden'}>

                    <Aside/>

                    <main className='p-4 flex w-full h-full overflow-auto'>

                        {children}

                    </main>

                </section>

            </section>

        </AppProvider>

    )

}




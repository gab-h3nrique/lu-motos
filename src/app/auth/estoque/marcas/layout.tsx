import Loading from '@/components/Loading'
import React, { Suspense } from 'react'

interface Props {

    children: React.ReactNode

}

export default function layout({children}: Props) {


    return (

        <Suspense fallback={<Loading/>}>
            <section className='p-4 flex w-full h-full overflow-auto relative'>
                {children}
            </section>
        </Suspense>

    )

}




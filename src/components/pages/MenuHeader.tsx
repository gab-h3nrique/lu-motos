'use client'

import React, { memo } from 'react'
import Svg from '../icons/Svg'

function MenuHeader(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {

    const { className , ...rest } = props

    console.log('heheheheh')

    return (

        <section className={`ml-6 gap-5 cursor-pointer flex justify-center items-center ${className}`} {...rest}>

            <Svg.Bars className='button h-5 w-5 fill-color-1'/>
            <Svg.Logo className='h-10 w-12 scale-[1.2] fill-color-1'/>

        </section>

    )

}

export default memo(MenuHeader)
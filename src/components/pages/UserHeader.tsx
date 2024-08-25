'use client'

import React, { memo } from 'react'
import { Description, Label } from '../texts/Texts'
import useUser from '@/hooks/useUser'
import Svg from '../icons/Svg'


function UserHeader(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {

    const { className , ...rest } = props

    const { user, setUser } = useUser()


    return (

        <section className={`flex gap-2 ${className}`} {...rest}>

            <article className='flex flex-col'>

                <Description>{user && user.name} Larissa Arielly</Description>
                <Label className='text-color-3'>{user && user.role} Administrador</Label>

            </article>

            <article className='flex w-9 h-9 rounded-full bg-color-2'>
                <Svg.User className='w-6 h-6 m-auto fill-bg-2'/>    
            </article>

        </section>

    )

}

export default memo(UserHeader)
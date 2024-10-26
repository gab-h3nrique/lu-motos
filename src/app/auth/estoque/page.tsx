'use client'

import Button from '@/components/elements/Button'
import Svg from '@/components/icons/Svg'
import Loading from '@/components/Loading'
import { Description, Subtitle } from '@/components/texts/Texts'
import { useRouter } from 'next/navigation'
import React, { memo, Suspense } from 'react'

function Page() {

  const router = useRouter()

  return (
    <Suspense fallback={<Loading/>}>
      <div className='p-4 gap-1 w-full h-full flex flex-col'>

        <Subtitle className='font-semibold'>Estoque</Subtitle>

        <Description onClick={router.back} className='flex gap-1 cursor-pointer'>
          <Svg.Angle className='w-4 h-4 fill-color-1 dark:fill-color-1-dark -rotate-90 mt-[.25rem]'/>
          voltar
        </Description>

        <section className='mt-3 flex gap-4'>

          <div className=" border dark:border-dark bg-background-2 dark:bg-background-2-dark flex flex-col p-4 gap-2 w-80 rounded-2xl">

            <Subtitle className="">Produtos / Serviços</Subtitle>

            <p className="description text-color-1 dark:text-color-1-dark">Gerencie seu estoque de produtos</p>

            <Button onClick={() => router.push('/auth/estoque/produtos')} className='mt-3 ml-auto text-color-2 dark:text-color-2-dark'>Acessar</Button>

          </div>

          <div className=" border dark:border-dark bg-background-2 dark:bg-background-2-dark flex flex-col p-4 gap-2 w-80 rounded-2xl">

            <Subtitle className="">Marcas</Subtitle>

            <p className="description text-color-1 dark:text-color-1-dark">Adicione uma marca para os produtos</p>

            <Button onClick={() => router.push('/auth/estoque/marcas')} className='mt-3 ml-auto text-color-2 dark:text-color-2-dark'>Acessar</Button>

          </div>

        </section>

      </div>
    </Suspense>

  )
}

export default memo(Page)
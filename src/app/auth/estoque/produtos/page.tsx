'use client'

import Button from '@/components/elements/Button'
import Input from '@/components/elements/Input'
import { Table, Tbody, Td, Thead, Tr } from '@/components/elements/Table'
import Svg from '@/components/icons/Svg'
import { Description, Subtitle } from '@/components/texts/Texts'
import { useRouter } from 'next/navigation'
import React, { memo, useState } from 'react'

function page() {

  const router = useRouter()

  const [ filter, setFilter ] = useState({ input: '', date: null, })

  return (

    <div className=' gap-1 w-full h-full flex flex-col'>

      <Subtitle className='font-semibold'>Produtos</Subtitle>

      <Description onClick={router.back} className='flex gap-1 cursor-pointer'>
        <Svg.Angle className='w-4 h-4 fill-color-1 -rotate-90 mt-[.25rem]'/>
        voltar
      </Description>

      <section className='mt-3 w-full h-full flex flex-col gap-4'>

        <div className='gap-4 flex w-full justify-end'>
          <Input type='text' onChange={(e) => setFilter((prev) => ({...prev, input: e.target.value}))} value={filter.input} placeholder='Pesquisar' icon={<Svg.MagnifyingGlass className='fill-white mt-[.15rem] w-5 h-5'/>}/>
          <Button className='bg-primary'>
          <Svg.Plus className='w-5 h-5 fill-color-1'/>
            Novo produto
          </Button>
        </div>

        <Table>
          <Thead>
            <Tr>
              <Td>Header 1</Td>
              <Td>Header 2</Td>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Data 1</Td>
              <Td>Data 2</Td>
            </Tr>
            <Tr>
              <Td>Data 3</Td>
              <Td>Data 4</Td>
            </Tr>
          </Tbody>
        </Table>

      </section>

    </div>

  )

}

export default memo(page)
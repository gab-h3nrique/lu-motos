'use client'

import Button from '@/components/elements/Button'
import Input from '@/components/elements/Input'
import { Table, Td, Tr, Th } from '@/components/elements/Table'
import Svg from '@/components/icons/Svg'
import { Description, Subtitle } from '@/components/texts/Texts'
import { useNotification } from '@/hooks/useNotaification'
import Api from '@/providers/http'
import { ProductType } from '@/types/productType'
import { useRouter } from 'next/navigation'
import React, { memo, useEffect, useState } from 'react'

function page() {

  const router = useRouter()

  const notification = useNotification()

  const [ filter, setFilter ] = useState({ input: '', date: '', })

  const [ products, setProducts ] = useState<ProductType[]>([])

  const [ page, setPage ] = useState(1)

  const [ limit, setLimit ] = useState(25)

  const [ load, setLoad ] = useState(false)

  async function getPaginatedProduct(pageParam: number, search?: boolean) {

    try {

      setLoad(true)

      console.log('vish...')

      const { products, success, message, ...rest } = await Api.get('/api/auth/products', { page: pageParam, limit: limit, ...filter })

      console.log('rest: ', rest)

      if(!success) return notification.push({ type: 'error', title: 'Atenção', description: 'Nenhum produto foi encontrado.' })

      setPage(pageParam)

      if(search) setProducts(products)
      else setProducts(prev => ([...prev, ...products]))
      
    } catch (error) {

      return notification.push({ type: 'error', title: 'Ops!', description: 'Houve um erro ao buscar os produtos.' })
      
    } finally {

      setLoad(false)

    }

  }


  useEffect(()=> {

    getPaginatedProduct(1)

  }, [])

  return (

    <div className='gap-1 w-full h-full flex flex-col'>

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
          <Tr>
            <Th>Data</Th>
            <Th>Data</Th>
          </Tr>
          <Tr>
            <Td>Data</Td>
            <Td>Data</Td>
          </Tr>
          <Tr>
            <Td>Data</Td>
            <Td>Data</Td>
            <Td>Data</Td>
            <Td>Data</Td>
          </Tr>
        </Table>

      </section>

    </div>

  )

}

export default memo(page)
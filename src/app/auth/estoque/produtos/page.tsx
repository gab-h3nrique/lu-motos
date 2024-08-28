'use client'

import Button from '@/components/elements/Button'
import Input from '@/components/elements/Input'
import { Table, Td, Tr, Th, Tbody } from '@/components/elements/Table'
import Svg from '@/components/icons/Svg'
import Observer from '@/components/Observer'
import { Description, Label, Subtitle } from '@/components/texts/Texts'
import { useNotification } from '@/hooks/useNotaification'
import Api from '@/providers/http'
import { ProductType } from '@/types/productType'
import Format from '@/utils/format'
import { useRouter } from 'next/navigation'
import React, { memo, use, useEffect, useState } from 'react'

function Page() {

  const router = useRouter()

  const notification = useNotification()

  const [ filter, setFilter ] = useState({ input: '', date: '', })

  const [ productArray, setProductArray ] = useState<ProductType[]>([])

  const [ total, setTotal ] = useState(0)

  const [ page, setPage ] = useState(1)

  const [ limit, setLimit ] = useState(5)

  const [ loading, setLoading ] = useState(false)

  async function getPaginatedProduct(pageParam: number, search?: boolean) {

    try {
      
      setLoading(true)

      const { products, total, success, message, ...rest } = await Api.get('/api/auth/products', { page: pageParam, limit: limit, ...filter })

      if(!success) return notification.push({ type: 'error', title: 'Atenção', description: 'Nenhum produto foi encontrado.' })

      console.log('pageParam: ', pageParam)

      setPage(pageParam)

      setTotal(total || 0)

      if(search) setProductArray(products)
      else setProductArray(prev => ([ ...prev, ...products ]))

    } catch (error) {

      return notification.push({ type: 'error', title: 'Ops!', description: 'Houve um erro ao buscar os produtos.' })
      
    } finally {

      setLoading(false)

    }

  }

  // router.


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
          <Input className='w-44' type='text' onChange={(e) => setFilter((prev) => ({...prev, input: e.target.value}))} value={filter.input} placeholder='Pesquisar' icon={<Svg.MagnifyingGlass className='fill-color-2 mt-[.15rem] w-5 h-5'/>}/>
          <Button className='bg-primary text-background-2'>
            <Svg.Plus className='w-5 h-5 fill-background-2'/>
            Novo produto
          </Button>
        </div>

        <Table className='w-full'>
          <Tbody className='w-full'>
            <Tr>
              <Th className='text-start font-semibold max-w-36'>Código</Th>
              <Th className='text-start font-semibold'>Produto</Th>
              <Th className='text-start font-semibold max-w-32'>Tipo</Th>
              <Th className='text-start font-semibold max-w-32'>Quantidade</Th>
              <Th className='text-start font-semibold max-w-36'>Valor</Th>
              <Th className='text-start font-semibold max-w-32'>Modificado</Th>
              <Th className='text-start font-semibold max-w-32'>Criado</Th>
            </Tr>

            { productArray.map((product, i)=> (

              <Tr key={`id-${i}`} className='list'>
                <Td className='max-w-36'>{ product.id }</Td>
                <Td>{ product.name }</Td>
                <Td className='max-w-32'>{ product.type }</Td>
                <Td className='max-w-32'>{ product.stock }</Td>
                <Td className='max-w-36'>R$ { Format.money(product.value) }</Td>
                <Td className='max-w-32' title={Format.date(product.updatedAt)}>{ Format.stringDate(product.updatedAt) }</Td>
                <Td className='max-w-32' title={Format.date(product.createdAt)}>{ Format.stringDate(product.createdAt) }</Td>
              </Tr>

            ))}

          </Tbody>
        </Table>

        <Button onClick={() => !loading && getPaginatedProduct((page + 1))} className={`w-full flex justify-center border-0 bg-transparent ${productArray.length >= total ? 'hidden' : ''}`}>
          <Observer isIntersecting={()=> !loading && getPaginatedProduct((page + 1))}/>
          <Description>{ !loading ? 'Carregar mais' : 'Carregando...' }</Description>
        </Button>

      </section>

    </div>

  )

}

export default memo(Page)
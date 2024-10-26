'use client'

import Button from '@/components/elements/Button'
import Input from '@/components/elements/Input'
import { Table, Td, Tr, Th, Tbody } from '@/components/elements/Table'
import Svg from '@/components/icons/Svg'
import Loading from '@/components/Loading'
import ProductModal from '@/components/modals/product/ProductModal'
import Observer from '@/components/Observer'
import { Description, Label, Subtitle } from '@/components/texts/Texts'
import { useNotification } from '@/hooks/useNotaification'
import Api from '@/providers/http'
import { ProductType } from '@/types/productType'
import Format from '@/utils/format'
import { usePathname, useRouter } from 'next/navigation'
import React, { memo, Suspense, use, useEffect, useState } from 'react'

function Page() {

  const router = useRouter()
  const pathname = usePathname()

  const notification = useNotification()

  const [ filter, setFilter ] = useState({ input: '', date: '', })

  const [ productArray, setProductArray ] = useState<ProductType[]>([])

  const [ total, setTotal ] = useState(0)

  const [ page, setPage ] = useState(1)

  const [ limit, setLimit ] = useState(25)

  const [ selected, setSelect ] = useState<ProductType | null>(null)

  const [ modal, setModal ] = useState(false)

  const [ loading, setLoading ] = useState(false)

  async function getPaginatedProduct(pageParam: number, search?: boolean) {

    try {
      
      setLoading(true)

      const { data, total, success, message, ...rest } = await Api.get('/api/auth/products', { page: pageParam, limit: limit, ...filter })

      if(!success) return notification({ type: 'error', title: 'Atenção', description: 'Nenhum dado foi encontrado.' })

      console.log('pageParam: ', pageParam)

      setPage(pageParam)

      setTotal(total || 0)

      if(search) setProductArray(data)
      else setProductArray(prev => ([ ...prev, ...data ]))

    } catch (error) {

      return notification({ type: 'error', title: 'Ops!', description: 'Houve um erro ao buscar os dados.' })
      
    } finally {

      setLoading(false)

    }

  }

  function openModal(item: ProductType | null) {

    const newUrl = `${pathname}?modal=${item?.id || ''}`;

    window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);

    setSelect(item)
    setModal(true)

  }

  function closeModal(data?: any) {

    const newUrl = `${pathname}`;

    window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);

    setSelect(null)
    setModal(false)

    if(!data) return

    const { updated, deleted } = data

    if(deleted && deleted.id) setProductArray(prev => prev.filter(e => e.id !== deleted.id) )

    if(updated && updated.id) {
      
      const index = productArray.findIndex(e => e.id == updated.id)

      console.log('updated: ', updated)

      if(index !== -1) setProductArray(prev => (prev.map(e => e.id === updated.id ? { ...updated } : e )))
      else setProductArray(prev => [ { ...updated } , ...prev ])

    }

  }


  useEffect(()=> {

    getPaginatedProduct(1)

  }, [])


  return (

    <Suspense fallback={<Loading/>}>
      <div className={`gap-1 w-full h-fit flex-col relative overflow-hidden ${modal ? 'hidden' : 'flex'}`}>

        <Subtitle className='font-semibold'>Produtos</Subtitle>

        <Description onClick={router.back} className='flex gap-1 cursor-pointer w-fit'>
          <Svg.Angle className='w-4 h-4 fill-color-2 dark:fill-color-2-dark -rotate-90 mt-[.25rem]'/>
          voltar
        </Description>

        <section className='mt-3 w-full h-full flex flex-col gap-4'>

          <div className='gap-4 flex w-full justify-end'>
            <Input className='w-44' type='text' onKeyUp={(e: any) => e.key == 'Enter' && getPaginatedProduct(1, true)} onChange={(e) => setFilter((prev) => ({...prev, input: e.target.value}))} value={filter.input} placeholder='Pesquisar' icon={
              <>
                <Svg.MagnifyingGlass onClick={() => getPaginatedProduct(1, true)} className={`fill-color-2 mt-[.15rem] w-5 h-5 cursor-pointer ${loading ? 'hidden' : ''}`}/>
                <Svg.Spinner className={`fill-color-2 mt-[.15rem] w-5 h-5 ${loading ? '' : 'hidden'}`}/>
              </>
            }/>
            <Button onClick={() => openModal(null)} className='bg-primary overflow-hidden text-background-2 dark:text-background-2-dark'>
              <Svg.Plus className='w-5 h-5 fill-background-2 dark:fill-background-2-dark'/>
              Novo produto
            </Button>
          </div>


          <Table className='w-full'>
            <Tbody className='w-full h-fit'>
              <Tr>
                <Th className='text-start font-semibold max-w-36'>Código</Th>
                <Th className='text-start font-semibold'>Produto</Th>
                <Th className='text-start font-semibold max-w-32 hidden md:flex'>Tipo</Th>
                <Th className='text-start font-semibold max-w-32 hidden md:flex'>Quantidade</Th>
                <Th className='text-start font-semibold max-w-36 hidden md:flex'>Valor</Th>
                <Th className='text-start font-semibold max-w-32 hidden md:flex'>Modificado</Th>
                <Th className='text-start font-semibold max-w-32 hidden md:flex'>Criado</Th>
              </Tr>

              { productArray.map((product, i)=> (

                <Tr key={`id-${i}`} className='list' onClick={() => openModal(product)}>
                  <Td className='max-w-36'>{ product.id }</Td>
                  <Td>{ product.name }</Td>
                  <Td className='max-w-32 hidden md:flex'>{ product.type }</Td>
                  <Td className='max-w-32 hidden md:flex'>{ product.stock }</Td>
                  <Td className='max-w-36 hidden md:flex'>R$ { Format.money(product.value) }</Td>
                  <Td className='max-w-32 hidden md:flex' title={Format.date(product.updatedAt)}>{ Format.stringDate(product.updatedAt) }</Td>
                  <Td className='max-w-32 hidden md:flex' title={Format.date(product.createdAt)}>{ Format.stringDate(product.createdAt) }</Td>
                </Tr>

              ))}

              { loading &&
                <Tr className='list'>
                  <Td className='max-w-36 hidden md:flex'><Svg.Spinner className='w-5 h-5 fill-background-2 dark:fill-background-2-dark opacity-[.4]'/></Td>
                  <Td><Svg.Spinner className='w-5 h-5 fill-background-2 dark:fill-background-2-dark opacity-[.4]'/></Td>
                  <Td className='max-w-32 hidden md:flex'><Svg.Spinner className='w-5 h-5 fill-background-2 dark:fill-background-2-dark opacity-[.4]'/></Td>
                  <Td className='max-w-32 hidden md:flex'><Svg.Spinner className='w-5 h-5 fill-background-2 dark:fill-background-2-dark opacity-[.4]'/></Td>
                  <Td className='max-w-36 hidden md:flex'><Svg.Spinner className='w-5 h-5 fill-background-2 dark:fill-background-2-dark opacity-[.4]'/></Td>
                  <Td className='max-w-32 hidden md:flex'><Svg.Spinner className='w-5 h-5 fill-background-2 dark:fill-background-2-dark opacity-[.4]'/></Td>
                  <Td className='max-w-32 hidden md:flex'><Svg.Spinner className='w-5 h-5 fill-background-2 dark:fill-background-2-dark opacity-[.4]'/></Td>
                </Tr>
              }

            </Tbody>
          </Table>


          <Button onClick={() => !loading && getPaginatedProduct((page + 1))} className={`w-full flex justify-center border-0 dark:border-0 bg-transparent ${productArray.length >= total ? 'hidden' : ''}`}>
            <Observer isIntersecting={()=> !loading && getPaginatedProduct((page + 1))}/>
            <Description>{ !loading ? 'Carregar mais' : 'Carregando...' }</Description>
          </Button>

        </section>


      </div>
      <ProductModal isOpen={modal} onClose={data => closeModal(data)} product={selected ? selected : undefined}/>
    </Suspense>
  )

}

export default memo(Page)
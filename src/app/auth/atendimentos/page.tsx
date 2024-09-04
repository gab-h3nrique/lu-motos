'use client'

import Button from '@/components/elements/Button'
import Input from '@/components/elements/Input'
import { Table, Td, Tr, Th, Tbody } from '@/components/elements/Table'
import Svg from '@/components/icons/Svg'
import OrderModal from '@/components/modals/order/OrderModal'
import Observer from '@/components/Observer'
import { Description, Label, Subtitle } from '@/components/texts/Texts'
import { useNotification } from '@/hooks/useNotaification'
import Api from '@/providers/http'
import { OrderType } from '@/types/orderType'
import { ProductType } from '@/types/productType'
import Format from '@/utils/format'
import { useRouter, usePathname, useParams, useSearchParams } from 'next/navigation'
import React, { memo, use, useEffect, useState } from 'react'


function Page() {

  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const searchParams = useSearchParams()

  const notification = useNotification()

  const [ filter, setFilter ] = useState({ input: '', date: '', })

  const [ ordersArray, setOrdersArray ] = useState<OrderType[]>([])

  const [ total, setTotal ] = useState(0)

  const [ page, setPage ] = useState(1)

  const [ limit, setLimit ] = useState(2)

  const [ loading, setLoading ] = useState(false)

  const [ selectedOrder, setSelectedorder ] = useState<OrderType | null>(null)

  const [ modal, setModal ] = useState(false)

  async function getPaginated(pageParam: number, search?: boolean) {

    try {
      
      setLoading(true)

      const { data, total, success, message, ...rest } = await Api.get('/api/auth/orders', { page: pageParam, limit: limit, ...filter })

      if(!success) return notification.push({ type: 'error', title: 'Atenção', description: 'Nenhum dado foi encontrado.' })

      console.log('pageParam: ', pageParam)

      setPage(pageParam)

      setTotal(total || 0)

      if(search) setOrdersArray(data)
      else setOrdersArray(prev => ([ ...prev, ...data ]))

    } catch (error) {

      return notification.push({ type: 'error', title: 'Ops!', description: 'Houve um erro ao buscar os produtos.' })
      
    } finally {

      setLoading(false)

    }

  }

  function openOrderModal(item: OrderType | null) {

    const newUrl = `${pathname}?modal=${item?.id || ''}`;

    window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);

    setSelectedorder(item)
    setModal(true)

  }
  function closeOrderModal(item: OrderType | null) {

    const newUrl = `${pathname}`;

    window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);

    setSelectedorder(null)
    setModal(false)

  }

  useEffect(()=> {

    getPaginated(1)

  }, [])


  return (  

    <div className='gap-1 w-full h-full flex flex-col relative'>

      <Subtitle className='font-semibold'>Atendimentos</Subtitle>

      <Description onClick={router.back} className='flex gap-1 cursor-pointer w-fit'>
        <Svg.Angle className='w-4 h-4 fill-color-1 -rotate-90 mt-[.25rem]'/>
        voltar
      </Description>

      <section className='mt-3 w-full h-full flex flex-col gap-4'>

        <div className='gap-4 flex w-full justify-end'>
          <Input className='w-44' type='text' onChange={(e) => setFilter((prev) => ({...prev, input: e.target.value}))} value={filter.input} placeholder='Pesquisar' icon={<Svg.MagnifyingGlass className='fill-color-2 mt-[.15rem] w-5 h-5'/>}/>
          <Button className='bg-primary overflow-hidden text-background-2' onClick={() => openOrderModal(null)}>
            <Svg.Plus className='w-5 h-5 fill-background-2'/>
            Novo atendimento
          </Button>
        </div>


        <Table className='w-full'>
          <Tbody className='w-full h-fit'>
            <Tr>
              <Th className='text-start font-semibold max-w-40'>Modelo</Th>
              <Th className='text-start font-semibold'>Cliente</Th>
              <Th className='text-start font-semibold max-w-32 hidden md:flex'>Serviços</Th>
              <Th className='text-start font-semibold max-w-36 hidden md:flex'>Valor</Th>
              <Th className='text-start font-semibold max-w-32 hidden md:flex'>Status</Th>
              <Th className='text-start font-semibold max-w-32 hidden md:flex'>Data</Th>
            </Tr>

            { ordersArray.map((item, i)=> (

              <Tr key={`id-${i}`} className='list' onClick={() => openOrderModal(item)}>
                <Th className='text-start font-semibold max-w-40'>{ item.model }</Th>
                <Th className='text-start font-semibold'>{ item.client?.name }</Th>
                <Th className='text-start font-semibold max-w-32 hidden md:flex'>{ item?.products?.length }</Th>
                <Th className='text-start font-semibold max-w-36 hidden md:flex'>100,00</Th>
                <Th className='text-start font-semibold max-w-32 hidden md:flex'>{ item.status }</Th>
                <Th className='text-start font-semibold max-w-32 hidden md:flex'title={Format.date(item.createdAt)}>{ Format.stringDate(item.createdAt) }</Th>
              </Tr>

            ))}

            { loading &&
              <Tr className='list'>
                <Th className='text-start font-semibold max-w-40'><Svg.Spinner className='w-5 h-5 fill-background-2 opacity-[.4]'/></Th>
                <Th className='text-start font-semibold'><Svg.Spinner className='w-5 h-5 fill-background-2 opacity-[.4]'/></Th>
                <Th className='text-start font-semibold max-w-32 hidden md:flex'><Svg.Spinner className='w-5 h-5 fill-background-2 opacity-[.4]'/></Th>
                <Th className='text-start font-semibold max-w-36 hidden md:flex'><Svg.Spinner className='w-5 h-5 fill-background-2 opacity-[.4]'/></Th>
                <Th className='text-start font-semibold max-w-32 hidden md:flex'><Svg.Spinner className='w-5 h-5 fill-background-2 opacity-[.4]'/></Th>
                <Th className='text-start font-semibold max-w-32 hidden md:flex'><Svg.Spinner className='w-5 h-5 fill-background-2 opacity-[.4]'/></Th>
              </Tr>
            }

          </Tbody>
        </Table>


        <Button onClick={() => !loading && getPaginated((page + 1))} className={`w-full flex justify-center border-0 bg-transparent ${ ordersArray.length >= total ? 'hidden' : ''}`}>
          <Observer isIntersecting={()=> !loading && getPaginated((page + 1))}/>
          <Description>{ !loading ? 'Carregar mais' : 'Carregando...' }</Description>
        </Button>

      </section>

      <OrderModal isOpen={modal} onClose={(e)=> closeOrderModal(e)} order={selectedOrder ? selectedOrder : undefined}/>

    </div>

  )

}

export default memo(Page)
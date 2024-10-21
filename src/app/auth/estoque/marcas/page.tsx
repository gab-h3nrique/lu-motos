'use client'

import Button from '@/components/elements/Button'
import Input from '@/components/elements/Input'
import { Table, Td, Tr, Th, Tbody } from '@/components/elements/Table'
import Svg from '@/components/icons/Svg'
import BrandModal from '@/components/modals/brand/BrandModal'
import Observer from '@/components/Observer'
import { Description, Label, Subtitle } from '@/components/texts/Texts'
import { useNotification } from '@/hooks/useNotaification'
import Api from '@/providers/http'
import { BrandType } from '@/types/brandType'
import { ProductType } from '@/types/productType'
import Format from '@/utils/format'
import { usePathname, useRouter } from 'next/navigation'
import React, { memo, use, useEffect, useState } from 'react'

function Page() {

  const router = useRouter()
  const pathname = usePathname()

  const notification = useNotification()

  const [ filter, setFilter ] = useState({ input: '', date: '', })

  const [ brandArray, setBrandArray ] = useState<BrandType[]>([])

  const [ total, setTotal ] = useState(0)

  const [ page, setPage ] = useState(1)

  const [ limit, setLimit ] = useState(25)

  const [ selected, setSelect ] = useState<BrandType | null>(null)

  const [ modal, setModal ] = useState(false)

  const [ loading, setLoading ] = useState(false)

  async function getPaginated(pageParam: number, search?: boolean) {

    try {
      
      setLoading(true)

      const { data, total, success, message, ...rest } = await Api.get('/api/auth/brands', { page: pageParam, limit: limit, ...filter })

      if(!success) return notification({ type: 'error', title: 'Atenção', description: 'Nenhuma dado foi encontrado.' })

      setPage(pageParam)

      setTotal(total || 0)

      if(search) setBrandArray(data)
      else setBrandArray(prev => ([ ...prev, ...data ]))

    } catch (error) {

      return notification({ type: 'error', title: 'Ops!', description: 'Houve um erro ao buscar os dados.' })
      
    } finally {

      setLoading(false)

    }

  }

  function openModal(item: BrandType | null) {

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

    if(deleted && deleted.id) setBrandArray(prev => prev.filter(e => e.id !== deleted.id) )

    if(updated && updated.id) {
      
      const index = brandArray.findIndex(e => e.id == updated.id)

      console.log('updated: ', updated)

      if(index !== -1) setBrandArray(prev => (prev.map(e => e.id === updated.id ? { ...updated } : e )))
      else setBrandArray(prev => [ { ...updated } , ...prev ])

    }

  }


  useEffect(()=> {

    getPaginated(1)

  }, [])


  return (

    <>
      <div className={`gap-1 w-full h-fit flex-col relative overflow-hidden ${modal ? 'hidden' : 'flex'}`}>

        <Subtitle className='font-semibold'>Marcas</Subtitle>

        <Description onClick={router.back} className='flex gap-1 cursor-pointer w-fit'>
          <Svg.Angle className='w-4 h-4 fill-color-1 -rotate-90 mt-[.25rem]'/>
          voltar
        </Description>

        <section className='mt-3 w-full h-full flex flex-col gap-4'>

          <div className='gap-4 flex w-full justify-end'>
            <Input className='w-44' type='text' onChange={(e) => setFilter((prev) => ({...prev, input: e.target.value}))} value={filter.input} placeholder='Pesquisar' icon={<Svg.MagnifyingGlass className='fill-color-2 mt-[.15rem] w-5 h-5'/>}/>
            <Button onClick={() => openModal(null)} className='bg-primary overflow-hidden text-background-2 dark:text-background-2-dark'>
              <Svg.Plus className='w-5 h-5 fill-background-2 dark:fill-background-2-dark'/>
              Nova marca
            </Button>
          </div>


          <Table className='w-full'>
            <Tbody className='w-full h-fit'>
              <Tr>
                <Th className='text-start font-semibold max-w-36'>Código</Th>
                <Th className='text-start font-semibold'>Marca</Th>
              </Tr>

              { brandArray.map((item, i)=> (

                <Tr key={`id-${i}`} className='list' onClick={() => openModal(item)}>
                  <Td className='max-w-36'>{ item.id }</Td>
                  <Td>{ item.name }</Td>
                </Tr>

              ))}

              { loading &&
                <Tr className='list'>
                  <Td className='max-w-36'><Svg.Spinner className='w-5 h-5 fill-background-2 opacity-[.4]'/></Td>
                  <Td className=''><Svg.Spinner className='w-5 h-5 fill-background-2 opacity-[.4]'/></Td>
                </Tr>
              }

            </Tbody>
          </Table>

          <Button onClick={() => !loading && getPaginated((page + 1))} className={`w-full flex justify-center border-0 dark:border-0 bg-transparent ${brandArray.length >= total ? 'hidden' : ''}`}>
            <Observer isIntersecting={()=> !loading && getPaginated((page + 1))}/>
            <Description>{ !loading ? 'Carregar mais' : 'Carregando...' }</Description>
          </Button>

        </section>

      </div>
      <BrandModal isOpen={modal} onClose={data => closeModal(data)} brand={selected ? selected : undefined}/>
    </>

  )

}

export default memo(Page)
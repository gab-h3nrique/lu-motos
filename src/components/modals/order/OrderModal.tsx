import Button from '@/components/elements/Button';
import Hr from '@/components/elements/Hr';
import Input from '@/components/elements/Input';
import Svg from '@/components/icons/Svg';
import { Description, Paragraph, Subtitle } from '@/components/texts/Texts';
import { useNotification } from '@/hooks/useNotaification';
import Api from '@/providers/http';
import { EMPTY_ORDER, OrderType } from '@/types/orderType';
import React, { memo, useEffect, useState } from 'react'

interface Props {

    isOpen: boolean;
    order?: OrderType
    onClose: (item?: any) => any

}

function OrderModal({ isOpen, order, onClose }: Props) {


    const notification = useNotification()

    const [ saveLoading, setSaveLoading ] = useState(false)

    const [ editedOrder, setEditedOrder ] = useState<OrderType>(EMPTY_ORDER)


    async function save() {

        try {

            
            if(saveLoading) return

            setSaveLoading(true)

            const { data, total, success, message, ...rest } = await Api.post('/api/auth/orders', editedOrder)
        
            if(!success) return notification.push({ type: 'warning', title: 'Atenção', description: 'Nenhum dado foi encontrado.' })

            notification.push({ type: 'success', title: 'Sucesso', description: 'Os dados foram salvos com sucesso.' })
      
            onClose(editedOrder)

      
        } catch (error) {
      
            return notification.push({ type: 'error', title: 'Ops!', description: 'Houve um erro ao buscar os produtos.' })
            
        } finally {
      
            setSaveLoading(false)
      
        }

    }

    useEffect(() => {

        setEditedOrder(order || EMPTY_ORDER)
    
        return () => {

            console.log('closing modal...')

        }

    }, [isOpen])
    
    return (

        <section className={`bg-background-1 flex w-full h-full absolute ${isOpen ? 'fles' : 'hidden'}`}>
            <div className='py-12 gap-1 w-full h-full flex flex-col items-center relative'>

                {/* <Subtitle className='mr-auto font-semibold'>{ order?.id ? `Atendimento ${order.id}` : 'Novo atendimento' }</Subtitle>

                <Description onClick={()=> onClose()} className='mr-auto flex gap-1 cursor-pointer w-fit'>
                <Svg.Angle className='w-4 h-4 fill-color-1 -rotate-90 mt-[.25rem]'/>
                    voltar
                </Description> */}

                <div className="flex flex-col gap-12 w-full max-w-[45rem] ">

                    <section className='flex flex-col gap-4'>

                        <Paragraph className='text-color-1'>
                            Veículo
                        </Paragraph>

                        <Description className='text-color-2'>
                            Use essa seção para identificar o veículo.
                        </Description>

                    </section>

                    <section className='grid grid-cols-5 gap-4'>

                        <div className='col-span-2'>
                            <Description className='mb-1 text-color-2'>Modelo<span className='ml-1 text-red-500'>*</span></Description>
                            <Input className='' type='text' onChange={(e: any) => setEditedOrder((prev) => ({...prev, model: e.target.value}))} value={editedOrder?.model}/>
                        </div>
                        <div className='col-span-1'>
                            <Description className='mb-1 text-color-2'>Ano</Description>
                            <Input className='' type='text' onChange={(e: any) => setEditedOrder((prev) => ({...prev, year: e.target.value}))} value={editedOrder?.year}/>
                        </div>

                    </section>

                    <Hr/>

                    <section className='flex gap-4'>

                        <Button onClick={()=> onClose()} className='ml-auto text-color-2'>Cancelar</Button>
                        <Button onClick={save} className='flex justify-center bg-primary text-color-2 min-w-[82px]'>
                            <Svg.Spinner className={`w-5 h-5 fill-background-2 opacity-[.4] ${!saveLoading && 'hidden'}`}/>
                            { !saveLoading ? 'Salvar' : '' }
                        </Button>

                    </section>


                </div>


            </div>
        </section>

    )

}

export default memo(OrderModal)
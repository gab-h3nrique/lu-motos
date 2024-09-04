import Button from '@/components/elements/Button';
import Checkbox from '@/components/elements/Checkbox';
import Hr from '@/components/elements/Hr';
import Input from '@/components/elements/Input';
import Status from '@/components/elements/Status';
import Switch from '@/components/elements/Switch';
import { Table, Tbody, Td, Tr } from '@/components/elements/Table';
import Textarea from '@/components/elements/Textarea';
import Svg from '@/components/icons/Svg';
import { Check } from '@/components/icons/Vectors';
import { Description, Label, Paragraph, Subtitle } from '@/components/texts/Texts';
import { useNotification } from '@/hooks/useNotaification';
import Api from '@/providers/http';
import { EMPTY_ORDER_PRODUCTS, OrderProductsType } from '@/types/orderProductsType';
import { EMPTY_ORDER, OrderType } from '@/types/orderType';
import { ProductType } from '@/types/productType';
import Format from '@/utils/format';
import React, { memo, useEffect, useState } from 'react'

interface Props {

    isOpen: boolean;
    order?: OrderType
    onClose: (item?: any) => any

}

function OrderModal({ isOpen, order, onClose }: Props) {

    console.log('redering modal....')

    const notification = useNotification()

    const [ loading, setLoading ] = useState(false)

    const [ saveLoading, setSaveLoading ] = useState(false)

    const [ editedOrder, setEditedOrder ] = useState<OrderType>(EMPTY_ORDER)

    const [ productArray, setProductArray ] = useState<ProductType[]>()

    async function getProducts() {

        try {

          
            setLoading(true)

            const { data, success, message, ...rest } = await Api.get('/api/auth/products')

            if(!success) return notification({ type: 'error', title: 'Atenção', description: 'Nenhum dado foi encontrado.' })

            setProductArray(data)  


        } catch (error) {
    
          return notification({ type: 'error', title: 'Ops!', description: 'Houve um erro ao buscar os dados.' })
          
        } finally {
    
          setLoading(false)
    
        }
    
    }


    function addProduct() {

        const newOrderProducts: OrderProductsType = {

            ...EMPTY_ORDER_PRODUCTS,
            id: undefined,

            productId: -1,
            orderId: editedOrder.id || -1,
        
            edit: true,
        }

        const newList = editedOrder.orderProducts

        newList?.push(newOrderProducts)

        setEditedOrder(prev => (
            {
                ...prev,
                orderProducts: newList
            }
        ))



    }

    function editProduct(item: OrderProductsType, index: number) {

        const newList = editedOrder.orderProducts ? editedOrder.orderProducts.map((e, i) => i == index ? {...item} : {...e, edit: false}) : []

        setEditedOrder(prev => (
            {
                ...prev,
                orderProducts: newList
            }
        ))


    }
    function removeProduct(index: number) {

        const newList = editedOrder.orderProducts ? editedOrder.orderProducts.filter((e, i) => i !== index) : []

        setEditedOrder(prev => (
            {
                ...prev,
                orderProducts: newList
            }
        ))


    }

    async function save() {

        try {

            
            if(saveLoading) return

            setSaveLoading(true)

            const { data, total, success, message, ...rest } = await Api.post('/api/auth/orders', editedOrder)
        
            if(!success) return notification({ type: 'warning', title: 'Atenção', description: 'Nenhum dado foi encontrado.' })

            notification({ type: 'success', title: 'Sucesso', description: 'Os dados foram salvos com sucesso.' })
      
            onClose(editedOrder)

      
        } catch (error) {
      
            return notification({ type: 'error', title: 'Ops!', description: 'Houve um erro ao buscar os produtos.' })
            
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

    useEffect(()=> {

        getProducts()

    }, [])
    
    return (

        <section className={`bg-background-1 flex w-full h-full absolute ${isOpen ? 'fles' : 'hidden'}`}>
            <div className='py-12 gap-1 w-full h-full flex flex-col items-center relative'>

                {/* <Subtitle className='mr-auto font-semibold'>{ order?.id ? `Atendimento ${order.id}` : 'Novo atendimento' }</Subtitle>

                <Description onClick={()=> onClose()} className='mr-auto flex gap-1 cursor-pointer w-fit'>
                <Svg.Angle className='w-4 h-4 fill-color-1 -rotate-90 mt-[.25rem]'/>
                    voltar
                </Description> */}

                <div className="flex flex-col gap-12 w-full max-w-[45rem] pb-10">

                    <section className='flex flex-col'>

                        <Paragraph>
                            Cliente
                        </Paragraph>

                        <Description className='text-color-3'>
                            Informe os dados do cliente
                        </Description>

                    </section>

                    <section className='grid grid-cols-4 gap-6'>

                        <div className='col-span-4 max-w-[20rem]'>
                            <Description className='mb-1 text-color-2'>Nome<span className='ml-1 text-red-500'>*</span></Description>
                            <Input type='text' onChange={(e: any) => setEditedOrder(prev => ({...prev, client: { ...prev.client, name: e.target.value } }))} value={editedOrder?.client?.name}/>
                        </div>
                        <div className='col-span-4 max-w-[25rem]'>
                            <Description className='mb-1 text-color-2'>Email</Description>
                            <Input type='email' onChange={(e: any) => setEditedOrder((prev: any) => ({...prev, client: { ...prev.client, email: e.target.value } }))} value={editedOrder?.client?.email}/>
                        </div>
                        <div className='col-span-2'>
                            <Description className='mb-1 text-color-2'>Documento</Description>
                            <Input maxLength={18} type='text' onChange={(e: any) => setEditedOrder((prev: any) => ({...prev, client: { ...prev.client, document: Format.brDocument(e.target.value) } }))} value={editedOrder?.client?.document}/>
                        </div>
                        <div className='col-span-2'>
                            <Description className='mb-1 text-color-2'>Número</Description>
                            <Input maxLength={15} type='text' onChange={(e: any) => setEditedOrder((prev: any) => ({...prev, client: { ...prev.client, number: Format.phone(e.target.value) } }))} value={editedOrder?.client?.number}/>
                        </div>
                        <div className='col-span-4 max-w-[25rem]'>
                            <Description className='mb-1 text-color-2'>Endereço</Description>
                            <Input type='email' onChange={(e: any) => setEditedOrder((prev: any) => ({...prev, client: { ...prev.client, info: e.target.value } }))} value={editedOrder?.client?.info}/>
                        </div>

                    </section>

                    <Hr/>

                    <section className='flex flex-col'>

                        <Paragraph>
                            Veículo
                        </Paragraph>

                        <Description className='text-color-3'>
                            Use essa seção para identificar o veículo.
                        </Description>

                    </section>

                    <section className='grid grid-cols-4 gap-6'>

                        <div className='col-span-4 max-w-[16rem]'>
                            <Description className='mb-1'>Modelo<span className='ml-1 text-red-500'>*</span></Description>
                            <Input onChange={(e: any) => setEditedOrder((prev) => ({...prev, model: e.target.value}))} value={editedOrder?.model}/>
                        </div>
                        <div className='col-span-1'>
                            <Description className='mb-1'>Placa</Description>
                            <Input onChange={(e: any) => setEditedOrder((prev) => ({...prev, plateNumber: e.target.value}))} value={editedOrder?.plateNumber}/>
                        </div>
                        <div className='col-span-1 max-w-[7rem]'>
                            <Description className='mb-1'>Ano</Description>
                            <Input type="number" onChange={(e: any) => setEditedOrder((prev) => ({...prev, year: e.target.value}))} value={editedOrder?.year}/>
                        </div>
                        <div className='col-span-4'>
                            <Description className='mb-1'>Observação do cliente</Description>
                            <Textarea type="text" className='min-h-20' onChange={(e: any) => setEditedOrder((prev) => ({...prev, clientObservation: e.target.value}))} value={editedOrder?.clientObservation || ''}/>
                        </div>

                    </section>

                    <Hr/>

                    <section className='flex flex-col'>

                        <Paragraph>
                            Serviços
                        </Paragraph>

                        <Description className='text-color-3' onClick={() => console.log('order: ', order)}>
                            Preencha os serviços e informações que irão ser realizados no veículo. { order?.orderProducts?.length }
                        </Description>

                    </section>

                    <section className='grid grid-cols-4 gap-6'>

                        <div className='col-span-4'>

                            <Description className='mb-1'>Produtos / serviços</Description>
                            <Table className='w-full'>
                                <Tbody className='w-full h-fit'>
                                    { editedOrder?.orderProducts?.length ? editedOrder?.orderProducts.map((item, i)=> (

                                        <Tr key={`id-${i}`} className={`list`}>
                                            <Td onClick={() =>editProduct({ ...item, edit: true }, i)} className={`text-start font-semibold p-5 grid grid-cols-10 ${item.edit && 'hidden' }`}>

                                                <section className="col-span-4">

                                                    <Description>{ productArray && productArray.length && productArray.map(e => e.id == item.id ? e.name : '') }</Description>

                                                    <Label className='text-color-3'>{ productArray && productArray.length && productArray.map(e => e.id == item.id ? e.type : '') }</Label>

                                                </section>
                                                <section className="col-span-4 flex flex-col">

                                                    <Status value={item.status}/>

                                                    <Label className='mt-1 text-color-3' title={Format.date(item.updatedAt)}>{ Format.stringDate(item.updatedAt) }</Label>

                                                </section>
                                                <section className="col-span-2">

                                                    <Description>R$ { Format.money(item.value) }</Description>

                                                    <div className='flex gap-1 items-center'>
                                                        <Svg.Close className={`fill-red-500 w-3 h-3 mt-1 ${ item.warranty && 'hidden' }`} />
                                                        <Svg.Check className={`fill-blue-500 w-3 h-3 mt-1 ${ !item.warranty && 'hidden' }`} />
                                                        <Label className='mt-1 text-color-3' title={Format.date(item.updatedAt)}>{ item.warranty ? 'com garantia' : 'sem garantia' }</Label>
                                                    </div>

                                                </section>
                                                
                                            </Td>

                                            <Td className={`text-start font-semibold p-5 gap-6 grid grid-cols-2 ${!item.edit && 'hidden' }`}>

                                                <div className='col-span-1'>
                                                    <Description className='mb-1'>Serviço / produto<span className='ml-1 text-red-500'>*</span></Description>
                                                    <Input onChange={(e: any) => setEditedOrder((prev) => ({...prev, model: e.target.value}))} value={editedOrder?.model || ''}/>
                                                </div>
                                                <div className='col-span-1 flex flex-col gap-2'>

                                                    <Description className='mb-1'>Garantia</Description>
                                                    <div className='flex items-center gap-2'>
                                                        <Switch onChange={(e) => editProduct({ ...item, warranty: !item.warranty }, i)} value={item.warranty}/>
                                                        <Description className='text-color-3'>do produto / serviço</Description>
                                                    </div>
                                                </div>
                                                <div className='col-span-2 flex flex-col'>

                                                    <Description className='mb-1'>Status</Description>
                                                    <div className='mb-3 flex items-center gap-2'>
                                                        <Checkbox onChange={(e) => editProduct({ ...item, status: 'aguardando' }, i)} value={item.status == 'aguardando'}/>
                                                        <Description className='text-color-3'>Aguardando</Description>
                                                    </div>
                                                    <div className='mb-3 flex items-center gap-2'>
                                                        <Checkbox onChange={(e) => editProduct({ ...item, status: 'aguardando peça' }, i)} value={item.status == 'aguardando peça'}/>
                                                        <Description className='text-color-3'>Aguardando peça </Description>
                                                    </div>
                                                    <div className='mb-3 flex items-center gap-2'>
                                                        <Checkbox onChange={(e) => editProduct({ ...item, status: 'em andamento' }, i)} value={item.status == 'em andamento'}/>
                                                        <Description className='text-color-3'>Em andamento</Description>
                                                    </div>
                                                    <div className='mb-3 flex items-center gap-2'>
                                                        <Checkbox onChange={(e) => editProduct({ ...item, status: 'sem solução' }, i)} value={item.status == 'sem solução'}/>
                                                        <Description className='text-color-3'>Sem solução</Description>
                                                    </div>
                                                    <div className='flex items-center gap-2'>
                                                        <Checkbox onChange={(e) => editProduct({ ...item, status: 'finalizado' }, i)} value={item.status == 'finalizado'}/>
                                                        <Description className='text-color-3'>Finalizado</Description>
                                                    </div>
                                                </div>
                                                <div className='col-span-2'>
                                                    <Description className='mt-3 mb-1'>Observação</Description>
                                                    <Textarea type="text" className='min-h-20' onChange={(e: any) => editProduct({ ...item, description: e.target.value }, i)} value={item.description}/>
                                                </div>
                                                <div className='col-span-2 flex gap-3'>
                                                    <Button onClick={() => removeProduct(i)} className='text-color-2'>Remover</Button>
                                                    <Button onClick={() =>editProduct({ ...item, edit: false }, i)} className='ml-auto text-color-2'>Cancelar</Button>
                                                    <Button onClick={() =>editProduct({ ...item, edit: false }, i)} className='flex justify-center bg-primary text-color-2 min-w-[82px]'>
                                                        <Svg.Spinner className={`w-5 h-5 fill-background-2 opacity-[.4] ${!saveLoading && 'hidden'}`}/>
                                                        { !saveLoading ? 'Salvar' : '' }
                                                    </Button>
                                                </div>

                                            </Td>
                                        </Tr>

                                    )): <></>}
                                </Tbody>
                            </Table>


                            <Description onClick={() => addProduct()} className='button mt-2 w-full text-center'>Novo produto / serviço</Description>

                        </div>

                        <div className='col-span-4 max-w-[16rem]'>
                            <Description className='mb-1'>Serviço / produto<span className='ml-1 text-red-500'>*</span></Description>
                            <Input onChange={(e: any) => setEditedOrder((prev) => ({...prev, model: e.target.value}))} value={editedOrder?.model || ''}/>
                        </div>

                        








                        <div className='col-span-1'>
                            <Description className='mb-1'>Placa</Description>
                            <Input onChange={(e: any) => setEditedOrder((prev) => ({...prev, plateNumber: e.target.value}))} value={editedOrder?.plateNumber || ''}/>
                        </div>
                        <div className='col-span-1 max-w-[7rem]'>
                            <Description className='mb-1'>Ano</Description>
                            <Input type="number" onChange={(e: any) => setEditedOrder((prev) => ({...prev, year: e.target.value}))} value={editedOrder?.year || ''}/>
                        </div>
                        <div className='col-span-4'>
                            <Description className='mb-1'>Observação do cliente</Description>
                            <Textarea type="text" className='min-h-20' onChange={(e: any) => setEditedOrder((prev) => ({...prev, clientObservation: e.target.value}))} value={editedOrder?.clientObservation || ''}/>
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
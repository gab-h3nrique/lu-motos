export interface ProductType {

    id?: number,
    name: string,
    brand?: string,
    type?: string,
    stock: number,
    costValue: number,
    value: number,

    updatedAt?: string,
    createdAt?: string,
    
}

export const EMPTY_PRODUCT = {

    id: undefined,
    name: '',
    brand: '',
    type: 'produto',
    stock: 1,
    costValue: 0,
    value: 0,

    updatedAt: undefined,
    createdAt: undefined,

}
import prisma from "@/databases/prisma"
import { ProductType } from "@/types/productType"
import { UserType } from "@/types/userType"

function model() {

    

    return {

        query: prisma.products,

        find: async(input: any) => {

            const product = await prisma.products.findFirst({

                where: {
                    id: input,
                    OR: [
                        { name:{ contains: input, mode: 'insensitive' } }, 
                        { type:{ contains: input, mode: 'insensitive' } }, 
                        { brand:{ contains: input, mode: 'insensitive' } }, 
                    ],
                },

            })

            return product

        },

        get: async(input?: string) => {

            const data = await prisma.products.findMany({

                where: {
                    OR: [
                        { name:{ contains: input, mode: 'insensitive' } }, 
                        { type:{ contains: input, mode: 'insensitive' } }, 
                        { brand:{ contains: input, mode: 'insensitive' } }, 
                    ],
                },
                orderBy: { id: 'desc'}

            }) || []

            return data

        },

        upsert: async(product: ProductType) => {

            const { id, ...rest } = product

            const created = await prisma.products.upsert({
                where: {
                    id: product?.id ? product.id : -1
                },
                update: product,
                create: product

            })

            return created
            
        },

        delete: async(id: number) => {

            const product = await prisma.products.delete({

                where: {
                    id: id
                },

            })

            return product

        },

        paginated: async(index: number, limit: number, input: string = '', startDate: any = '', endDate: any = '') => {

            const data = await prisma.products.findMany({

                where: {
                    OR: [
                        { name:{ contains: input, mode: 'insensitive' } }, 
                        { type:{ contains: input, mode: 'insensitive' } }, 
                        { brand:{ contains: input, mode: 'insensitive' } }, 
                    ],
                    createdAt: {
                        gte: startDate !== '' ? new Date(startDate)  : undefined,
                        lte: endDate !== '' ? new Date(endDate) : undefined,
                    },
                },
                skip: index,
                take: limit,
                orderBy: { id: 'desc'}

            }) || []

            const total = await prisma.products.count({
                where: {
                    OR: [
                        { name:{ contains: input, mode: 'insensitive' } }, 
                        { type:{ contains: input, mode: 'insensitive' } }, 
                        { brand:{ contains: input, mode: 'insensitive' } }, 
                    ],
                    createdAt: {
                        gte: startDate !== '' ? new Date(startDate)  : undefined,
                        lte: endDate !== '' ? new Date(endDate) : undefined,
                    },
                },
            }) || 0

            return { data, total }

        }

    }

}

export const ProductModel = model();
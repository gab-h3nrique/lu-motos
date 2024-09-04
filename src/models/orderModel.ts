import prisma from "@/databases/prisma"
import { OrderType } from "@/types/orderType"
import { ProductType } from "@/types/productType"
import { UserType } from "@/types/userType"

function model() {

    

    return {

        query: prisma.orders,

        find: async(input: any) => {

            const data = await prisma.orders.findFirst({

                where: {
                    OR: [
                        { id: input }, 
                        { model:{ contains: input } }, 
                        { client:{ name: { contains: input }} }, 
                        { client:{ email: { contains: input }} }, 
                    ],
                },
                include: { user: true, client: true, orderProducts: true },

            })

            return data

        },

        get: async(input?: string) => {

            const data = await prisma.orders.findMany({

                where: {
                    OR: [
                        { model:{ contains: input } }, 
                        { client:{ name: { contains: input }} }, 
                        { client:{ email: { contains: input }} }, 
                    ],
                },
                include: { user: true, client: true, orderProducts: true },
                orderBy: { id: 'desc'}

            }) || []

            return data

        },

        upsert: async(item: OrderType) => {
            
            const created = await prisma.orders.upsert({
                where: {
                    id: item.id
                },
                update: item as any,
                create: item as any

            })

            return created
            
        },

        delete: async(id: number) => {

            const data = await prisma.orders.delete({

                where: {
                    id: id
                },

            })

            return data

        },

        paginated: async(index: number, limit: number, input: any = null, startDate: any = '', endDate: any = '') => {

            const data = await prisma.orders.findMany({

                where: {
                    OR: [
                        { model:{ contains: input } }, 
                        { client:{ name: { contains: input }} }, 
                        { client:{ email: { contains: input }} }, 
                    ],
                    createdAt: {
                        gte: startDate !== '' ? new Date(startDate)  : undefined,
                        lte: endDate !== '' ? new Date(endDate) : undefined,
                    },
                },
                skip: index,
                take: limit,
                include: { user: true, client: true, orderProducts: true },
                orderBy: { id: 'desc'}

            }) || []

            const total = await prisma.orders.count({
                where: {
                    OR: [
                        { model:{ contains: input } }, 
                        { client:{ name: { contains: input }} }, 
                        { client:{ email: { contains: input }} }, 
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

export const OrderModel = model();
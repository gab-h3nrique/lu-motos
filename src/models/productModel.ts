import prisma from "@/databases/prisma"
import { UserType } from "@/types/userType"

function model() {

    

    return {

        query: prisma.products,

        paginated: async(index: number, limit: number, input: string = '', startDate: any = '', endDate: any = '') => {

            const products = await prisma.products.findMany({

                where: {
                    OR: [
                        { name:{ contains: input } }, 
                        { type:{ contains: input } }, 
                        { brand:{ contains: input } }, 
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
                        { name:{ contains: input } }, 
                        { type:{ contains: input } }, 
                        { brand:{ contains: input } }, 
                    ],
                    createdAt: {
                        gte: startDate !== '' ? new Date(startDate)  : undefined,
                        lte: endDate !== '' ? new Date(endDate) : undefined,
                    },
                },
            }) || 0

            return { products, total }

        }

    }

}

export const ProductModel = model();
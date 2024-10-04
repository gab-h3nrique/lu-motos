import prisma from "@/databases/prisma"
import { BrandType } from "@/types/brandType"
import { UserType } from "@/types/userType"

function model() {

    

    return {

        query: prisma.brands,

        find: async(input: any) => {

            const brand = await prisma.brands.findFirst({

                where: {
                    OR: [
                        { id: input }, 
                        { name:{ contains: input } }, 
                    ],
                },

            })

            return brand

        },

        get: async(input?: string) => {

            const data = await prisma.brands.findMany({

                where: {
                    OR: [
                        { name:{ contains: input } }, 
                    ],
                },
                orderBy: { id: 'desc'}

            }) || []

            return data

        },

        upsert: async(item: BrandType) => {

            const created = await prisma.brands.upsert({
                where: {
                    id: item.id || -1
                },
                update: item,
                create: item

            })

            return created
            
        },

        delete: async(id: number) => {

            const brand = await prisma.brands.delete({

                where: {
                    id: id
                },

            })

            return brand

        },

        paginated: async(index: number, limit: number, input: string = '') => {

            const data = await prisma.brands.findMany({

                where: {
                    name:{ contains: input }
                },
                skip: index,
                take: limit,
                orderBy: { id: 'desc'}

            }) || []

            const total = await prisma.products.count({
                where: {
                    name:{ contains: input }
                },
            }) || 0

            return { data, total }

        }

    }

}

export const BrandModel = model();
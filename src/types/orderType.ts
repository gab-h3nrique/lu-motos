import { empty } from "@prisma/client/runtime/library";
import { ClientType } from "./clientType";
import { ProductType } from "./productType";
import { UserType } from "./userType";

export interface OrderType {

    id?: number,

    client?: ClientType,
    clientId?: number,

    user?: ClientType,
    userId?: number,


    model: string,
    year?: number,
    plateNumber?: string,

    clientObservation?: string,
    defectDescription?: string,
    technicalReport?: string,

    warranty: boolean,
    warrantyDescription?: string,

    status: string,

    products?: ProductType[],

    updatedAt?: string,
    createdAt?: string,
}

export const EMPTY_ORDER = {

    id: undefined,

    client: undefined,
    clientId: undefined,

    user: undefined,
    userId: undefined,


    model: '',
    year: undefined,
    plateNumber: undefined,

    clientObservation: undefined,
    defectDescription: undefined,
    technicalReport: undefined,

    warranty: false,
    warrantyDescription: undefined,

    status: 'em andamento',

    products: undefined,

    updatedAt: undefined,
    createdAt: undefined,

}
import { PrismaClient } from "../generated/prisma/client";
const prisma = new PrismaClient();


export const getOnlineBills = async() => {
    return await prisma.onlineBill.findMany(
        {
        include: {
            customer: true,
            onlineOrders: {
                include: {
                    product: true
                }
            }
        },
         orderBy: {
            onlineBillID: "desc",
        }
    }
);
}

export const getOnlineBillById = async(id: number) => {
    return await prisma.onlineBill.findUnique({
        where: { onlineBillID: id },
        include: {
            customer: true,
            onlineOrders: {
                include: {
                    product: true
                }
            }
        }
    });
}

export const createOnlineBill = async(
    customerID: number,
    logisticType: string,
    logisticName: string,
    onlineBillDate?: Date,
    send?: boolean
) => {
    return await prisma.onlineBill.create({
        data: {
            customerID,
            logisticType,
            logisticName,
            onlineBillDate,
            send
        }
    });
}

export const updateOnlineBill = async(
    id: number,
    customerID: number,
    logisticType: string,
    logisticName: string,
    onlineBillDate?: Date,
    send?: boolean
) => {
    return await prisma.onlineBill.update({
        where: { onlineBillID: id },
        data: {
            customerID,
            logisticType,
            logisticName,
            onlineBillDate,
            send
        }
    });
}

export const deleteOnlineBill = async(id: number) => {
    return await prisma.onlineBill.delete({
        where: { onlineBillID: id }
    });
}

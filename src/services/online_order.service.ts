import { PrismaClient } from "../generated/prisma/client";
const prisma = new PrismaClient();

export const getOnlineOrders = async() => {
    return await prisma.onlineOrder.findMany({
        include: {
            onlineBill: true,
            product: true
        }
    });
}

export const getOnlineOrderById = async(id: number) => {
    return await prisma.onlineOrder.findUnique({
        where: { onlineOrderID: id },
        include: {
            onlineBill: true,
            product: true
        }
    });
}

export const createOnlineOrder = async(onlineBillID: number, productID: number, saleQty?: number, total?: number) => {
    return await prisma.onlineOrder.create({
        data: {
            onlineBillID,
            productID,
            saleQty,
            total
        }
    });
}

export const updateOnlineOrder = async(id: number, onlineBillID: number, productID: number, saleQty?: number, total?: number) => {
    return await prisma.onlineOrder.update({
        where: { onlineOrderID: id },
        data: {
            onlineBillID,
            productID,
            saleQty,
            total
        }
    });
}

export const deleteOnlineOrder = async(id: number) => {
    return await prisma.onlineOrder.delete({
        where: { onlineOrderID: id }
    });
}

import { PrismaClient } from "../generated/prisma/client";
const prisma = new PrismaClient();
export const getOrders = async() => {
    return await prisma.order.findMany({
        include: {
            bill: true,
            product: true
        }
    });
}

export const getOrderById = async(id: number) => {
    return await prisma.order.findUnique({
        where: { orderID: id },
        include: {
            bill: true,
            product: true
        }
    });
}

export const createOrder = async(billID: number, productID: number, saleQty?: number, total?: number) => {
    return await prisma.order.create({
        data: {
            billID,
            productID,
            saleQty,
            total
        }
    });
}

export const updateOrder = async(id: number, billID: number, productID: number, saleQty?: number, total?: number) => {
    return await prisma.order.update({
        where: { orderID: id },
        data: {
            billID,
            productID,
            saleQty,
            total
        }
    });
}

export const deleteOrder = async(id: number) => {
    return await prisma.order.delete({
        where: { orderID: id }
    });
}
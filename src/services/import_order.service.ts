import { PrismaClient } from "../generated/prisma/client";
const prisma = new PrismaClient();
export const getImportOrders = async() => {
    return await prisma.importOrder.findMany({
        include: {
            importBill: true,
            product: true
        }
    });
}

export const getImportOrderById = async(id: number) => {
    return await prisma.importOrder.findUnique({
        where: { importOrderID: id },
        include: {
            importBill: true,
            product: true
        }
    });
}

export const createImportOrder = async(
    importBillID: number,
    productID: number,
    importQty: number,
    importPrice: number,
    total: number
) => {
    return await prisma.importOrder.create({
        data: {
            importBillID,
            productID,
            importQty,
            importPrice,
            total
        }
    });
}

export const updateImportOrder = async(
    id: number,
    importBillID: number,
    productID: number,
    importQty: number,
    importPrice: number,
    total: number
) => {
    return await prisma.importOrder.update({
        where: { importOrderID: id },
        data: {
            importBillID,
            productID,
            importQty,
            importPrice,
            total
        }
    });
}

export const deleteImportOrder = async(id: number) => {
    return await prisma.importOrder.delete({
        where: { importOrderID: id }
    });
}

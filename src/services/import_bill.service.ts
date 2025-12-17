import { PrismaClient } from "../generated/prisma/client";
const prisma = new PrismaClient();
export const getImportBills = async() => {
    return await prisma.importBill.findMany({
        include: {
            supplier: true,
            importOrders: {
                include: {
                    product: true
                }
            }
        }
    });
}

export const getImportBillById = async(id: number) => {
    return await prisma.importBill.findUnique({
        where: { importBillID: id },
        include: {
            supplier: true,
            importOrders: {
                include: {
                    product: true
                }
            }
        }
    });
}

export const createImportBill = async(
    supplierID: number,
    importDate: Date,
    totalAmount: number,
    status?: string
) => {
    return await prisma.importBill.create({
        data: {
            supplierID,
            importDate,
            totalAmount,
            status
        }
    });
}

export const updateImportBill = async(
    id: number,
    supplierID: number,
    importDate: Date,
    totalAmount: number,
    status?: string
) => {
    return await prisma.importBill.update({
        where: { importBillID: id },
        data: {
            supplierID,
            importDate,
            totalAmount,
            status
        }
    });
}

export const deleteImportBill = async(id: number) => {
    return await prisma.importBill.delete({
        where: { importBillID: id }
    });
}

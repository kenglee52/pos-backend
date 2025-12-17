import { PrismaClient } from "../generated/prisma/client";
const prisma = new PrismaClient()

export const getBills = async() => {
    return await prisma.bill.findMany({
        include: {
            employee: true,
            orders: {
                include: {
                    product: true
                }
            }
        }
    });
}

export const getBillById = async(id: number) => {
    return await prisma.bill.findUnique({
        where: { billID: id },
        include: {
            employee: true,
            orders: {
                include: {
                    product: true
                }
            }
        }
    });
}

export const createBill = async(employeeID: string, billDate?: Date) => {
    return await prisma.bill.create({
        data: {
            employeeID,
            billDate
        }
    });
}

export const deleteBill = async(id: number) => {
    return await prisma.bill.delete({
        where: { billID: id }
    });
}

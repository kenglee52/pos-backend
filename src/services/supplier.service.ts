import { PrismaClient } from "../generated/prisma/client";
const prisma = new PrismaClient();

export const getSuppliers = async() => {
    return await prisma.supplier.findMany();
}

export const getSupplierById = async(id: number) => {
    return await prisma.supplier.findUnique({
        where: { supplierID: id }
    });
}

export const checkSupplierTel = async(tel: string) => {
    return await prisma.supplier.findFirst({
        where: { supplierTel: tel }
    });
}

export const checkSupplierEmail = async(email: string) => {
    return await prisma.supplier.findFirst({
        where: { supplierEmail: email }
    });
}

export const createSupplier = async(
    supplierName: string,
    supplierTel: string,
    supplierEmail: string,
    supplierAddress: string,
    contactPerson: string
) => {
    return await prisma.supplier.create({
        data: {
            supplierName,
            supplierTel,
            supplierEmail,
            supplierAddress,
            contactPerson
        }
    });
}

export const updateSupplier = async(
    id: number,
    supplierName: string,
    supplierTel: string,
    supplierEmail: string,
    supplierAddress: string,
    contactPerson: string
) => {
    return await prisma.supplier.update({
        where: { supplierID: id },
        data: {
            supplierName,
            supplierTel,
            supplierEmail,
            supplierAddress,
            contactPerson
        }
    });
}

export const deleteSupplier = async(id: number) => {
    return await prisma.supplier.delete({
        where: { supplierID: id }
    });
}

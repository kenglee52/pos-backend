import { PrismaClient } from "../generated/prisma/client";
const prisma = new PrismaClient();


export const getProducts = async() => {
    return await prisma.product.findMany(
        {
        include: {
            category: true,
            unit: true
        }
    }
);
}

export const getProductById = async(id: number) => {
    return await prisma.product.findUnique({
        where: { productID: id },
        include: {
            category: true,
            unit: true
        }
    });
}

export const checkProductName = async(name: string) => {
    return await prisma.product.findFirst({
        where: { productName: name }
    });
}

export const createProduct = async(
    productName: string,
    categoryID: number,
    unitID: number,
    stockQty: number,
    price: number,
    image: string,
    importPrice: number,
    manufacture?: Date,
    expiry?: Date,
    description?: string
) => {
    return await prisma.product.create({
        data: {
            productName,
            categoryID,
            unitID,
            stockQty,
            price,
            image,
            importPrice,
            manufacture,
            expiry,
            description
        }
    });
}

export const updateProduct = async(
    id: number,
    productName: string,
    categoryID: number,
    unitID: number,
    stockQty: number,
    price: number,
    image: string,
    importPrice: number,
    manufacture?: Date,
    expiry?: Date,
    description?: string
) => {
    return await prisma.product.update({
        where: { productID: id },
        data: {
            productName,
            categoryID,
            unitID,
            stockQty,
            price,
            image,
            importPrice,
            manufacture,
            expiry,
            description
        }
    });
}

export const deleteProduct = async(id: number) => {
    return await prisma.product.delete({
        where: { productID: id }
    });
}

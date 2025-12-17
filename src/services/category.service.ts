import { PrismaClient } from "../generated/prisma/client";
const prisma = new PrismaClient();

export const getCategories = async() => {
    return await prisma.category.findMany();
}

export const getCategoryById = async(id: number) => {
    return await prisma.category.findUnique({
        where: { categoryID: id }
    });
}

export const checkCategoryName = async(name: string) => {
    return await prisma.category.findFirst({
        where: { categoryName: name }
    });
}

export const createCategory = async(categoryName: string) => {
    return await prisma.category.create({
        data: { categoryName }
    });
}

export const updateCategory = async(id: number, categoryName: string) => {
    return await prisma.category.update({
        where: { categoryID: id },
        data: { categoryName }
    });
}

export const deleteCategory = async(id: number) => {
    return await prisma.category.delete({
        where: { categoryID: id }
    });
}
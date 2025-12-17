import { PrismaClient } from "../generated/prisma/client"
const prisma = new PrismaClient();

export const getUnits = async() => {
    return await prisma.unit.findMany();
}

export const getUnitById = async(id: number) => {
    return await prisma.unit.findUnique({
        where: { unitID: id }
    });
}

export const checkUnitName = async(name: string) => {
    return await prisma.unit.findFirst({
        where: { unitName: name }
    });
}

export const createUnit = async(unitName: string) => {
    return await prisma.unit.create({
        data: { unitName }
    });
}

export const updateUnit = async(id: number, unitName: string) => {
    return await prisma.unit.update({
        where: { unitID: id },
        data: { unitName }
    });
}

export const deleteUnit = async(id: number) => {
    return await prisma.unit.delete({
        where: { unitID: id }
    });
}
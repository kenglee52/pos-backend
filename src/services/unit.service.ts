import { PrismaClient } from "../generated/prisma/client"
const prisma = new PrismaClient();

export const checkUnique = async(unitName: string)=>{
   return await prisma.unit.findFirst({
         where : {
            unitName : unitName
         }
   })
}

export const createUnit = async(unitName: string) =>{
  return await prisma.unit.create({
       data: { unitName: unitName }
  })
}
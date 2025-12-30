import { PrismaClient } from "../generated/prisma/client";

const prisma = new PrismaClient();

export const checkTel = async(tel:string)=>{
    return await prisma.customer.findFirst({
         where: {customerTel: tel}
    });
}

export const createCustomer = async(customerName: string, customerTel: string, customerPassword: string)=>{
   return await prisma.customer.create({
         data: {
           customerName: customerName,
           customerTel: customerTel,
           customerPassword: customerPassword
         }
   })
}

export const getCustomers = async() =>{
   return await prisma.customer.findMany();
}

export const getCustomerById = async(id:number) =>{
    return await prisma.customer.findUnique({
         where: {customerID: id}
    })
}

export const updateCustomer = async(customerName: string, customerTel: string, customerPassword: string, id:number) => {
   return await prisma.customer.update({
         data: {customerName:customerName, customerTel: customerTel, customerPassword: customerPassword},
         where :{customerID: id}      
   });
}

export const deleteCustomer = async(id:number) =>{
    return await prisma.customer.delete({
         where: {customerID: id}
    })
}
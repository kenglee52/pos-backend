import { PrismaClient } from "../generated/prisma/client";
const prisma = new PrismaClient();
export const getEmployees = async() => {
    return await prisma.employee.findMany({
        include: { department: true }
    });
}

export const getEmployeeById = async(id: string) => {
    return await prisma.employee.findUnique({
        where: { employeeID: id },
        include: { department: true }
    });
}

export const checkEmployeeTel = async(tel: string) => {
    return await prisma.employee.findFirst({
        where: { tel }
    });
}

export const createEmployee = async(employeeID: string, employeeName: string, gender: string, tel: string, departmentID: number, password: string) => {
    return await prisma.employee.create({
        data: {
            employeeID,
            employeeName,
            gender,
            tel,
            departmentID,
            password
        }
    });
}

export const updateEmployee = async(id: string, employeeName: string, gender: string, tel: string, departmentID: number, password: string) => {
    return await prisma.employee.update({
        where: { employeeID: id },
        data: { employeeName, gender, tel, departmentID, password }
    });
}

export const deleteEmployee = async(id: string) => {
    return await prisma.employee.delete({
        where: { employeeID: id }
    });
}
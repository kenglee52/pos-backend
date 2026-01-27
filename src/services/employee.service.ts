import { PrismaClient } from "../generated/prisma/client";
const prisma = new PrismaClient();
export const getEmployees = async () => {
    return await prisma.employee.findMany({
        include: { department: true },
    });
}

export const getEmployeeById = async (id: string) => {
    return await prisma.employee.findUnique({
        where: { employeeID: id },
        include: { department: true }
    });
}

export const checkEmployeeTel = async (tel: string) => {
    return await prisma.employee.findFirst({
        where: { tel }
    });
}

export const createEmployee = async (
    employeeName: string,
    gender: string,
    tel: string,
    departmentID: number,
    password: string
) => {
    const employeeID = await generateEmployeeID();

    return await prisma.employee.create({
        data: {
            employeeID,
            employeeName,
            gender,
            tel,
            departmentID,
            password,
        },
    });
};


export const updateEmployee = async (id: string, employeeName: string, gender: string, tel: string, departmentID: number) => {
    return await prisma.employee.update({
        where: { employeeID: id },
        data: { employeeName: employeeName, gender: gender, tel: tel, departmentID: departmentID }
    });
}

export const deleteEmployee = async (id: string) => {
    return await prisma.employee.delete({
        where: { employeeID: id }
    });
}

export const generateEmployeeID = async (): Promise<string> => {
    const lastEmployee = await prisma.employee.findFirst({
        orderBy: {
            employeeID: "desc",
        },
        select: {
            employeeID: true,
        },
    });

    if (!lastEmployee) {
        return "EM001";
    }

    const lastNumber = parseInt(lastEmployee.employeeID.replace("EM", ""));
    const newNumber = lastNumber + 1;

    return `EM${newNumber.toString().padStart(3, "0")}`;
};

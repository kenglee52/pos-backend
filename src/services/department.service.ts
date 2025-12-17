import { PrismaClient } from "../generated/prisma/client";
const prisma = new PrismaClient();

export const checkDepartment = async (name: string) => {
  return prisma.department.findFirst({
    where: { departmentName: name },
  });
};

export const createDepartment = async (departmentName: string) => {
  return prisma.department.create({
    data: { departmentName },
  });
};

export const getDepartments = async () => {
  return prisma.department.findMany();
};

export const getDepartmentById = async (id: number) => {
  return prisma.department.findUnique({
    where: { departmentID: id },
  });
};

export const updateDepartment = async (
  departmentName: string,
  id: number
) => {
  return prisma.department.update({
    data: { departmentName: departmentName },
    where: { departmentID: id },
  });
};

export const deleteDepartment = async (id: number) => {
  return prisma.department.delete({
    where: { departmentID: id },
  });
};

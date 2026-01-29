import * as employeeService from "../services/employee.service";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "../generated/prisma/client";
const prisma = new PrismaClient();

export const getEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await employeeService.getEmployees();
    res.status(200).json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "ບໍ່ພົບຂໍ້ມູນ", error });
  }
};

export const getEmployeeById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const employee = await employeeService.getEmployeeById(id);
    if (!employee) {
      return res.status(404).json({ message: "ບໍ່ພົບພະນັກງານ" });
    }
    res.status(200).json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const createEmployee = async (req: Request, res: Response) => {
  try {
    const {employeeName, gender, tel, departmentID, password } = req.body;
    if (!employeeName || !gender || !tel || !departmentID || !password) {
      return res.status(400).json({ message: "ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບ" });
    }
    const telExist = await employeeService.checkEmployeeTel(tel);
    if (telExist) {
      return res.status(409).json({ message: "ເບີໂທນີ້ຖືກໃຊ້ແລ້ວ" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const employee = await employeeService.createEmployee(
      employeeName,
      gender,
      tel,
      departmentID,
      hashPassword
    );
    return res.status(201).json({
      message: "ສ້າງພະນັກງານສຳເລັດ",
      data: employee,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error });
  }
};

export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { employeeName, gender, tel, departmentID } = req.body;
    if (!employeeName || !gender || !tel || !departmentID ) {
      return res.status(400).json({ message: "ຂໍ້ມູນຫ້າມເປັນຄ່າຫວ່າງ" });
    }
    const oldEmployee = await employeeService.getEmployeeById(id);
    if (!oldEmployee) {
      return res.status(404).json({ message: "ບໍ່ພົບພະນັກງານ" });
    }
    const telExist = await employeeService.checkEmployeeTel(tel);
    if (telExist && telExist.employeeID !== id) {
      return res.status(409).json({ message: "ເບີໂທນີ້ຖືກໃຊ້ແລ້ວ" });
    }
    const updated = await employeeService.updateEmployee(
      id,
      employeeName,
      gender,
      tel,
      departmentID,
    );
    res.status(200).json({
      message: "ອັບເດດສຳເລັດ",
      data: updated,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const employee = await employeeService.getEmployeeById(id);
    if (!employee) {
      return res.status(404).json({ message: "ບໍ່ພົບພະນັກງານ" });
    }
    await employeeService.deleteEmployee(id);
    res.json({ message: "ລຶບພະນັກງານສຳເລັດ" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const loginEmployee = async(req:Request, res: Response) =>{
  const {tel , password} = req.body;
  try {
    const employee = await prisma.employee.findFirst({
      where: {tel: tel},
      include: {
        department: true,
      }
    });
    if(!employee){
      return res.status(404).json({message: "Tel not found"});
    }
    const isMatch = await bcrypt.compare(password, employee.password);
    if(!isMatch){
      return res.status(400).json({message: "Password is incorrect"});
    }
    res.status(200).json({
      message: "Login success",
      data : employee
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
}

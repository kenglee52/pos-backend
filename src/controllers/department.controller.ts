import { Request, Response } from "express";
import * as service from "../services/department.service";

export const createDepartment = async (req: Request, res: Response) => {
  try {
    const { departmentName } = req.body;
    if (!departmentName)
      return res.status(400).json({ message: "ຂໍ້ມູນຫ້າມວ່າງ" });

    const exist = await service.checkDepartment(departmentName);
    if (exist)
      return res.status(409).json({ message: "ພະແນກນີ້ມີແລ້ວ" });

    const data = await service.createDepartment(departmentName);
    res.status(201).json({ message: "ສ້າງສຳເລັດ", data });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getDepartments = async (_: Request, res: Response) => {
  try {
    const data = await service.getDepartments();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const getDepartmentById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = await service.getDepartmentById(id);
    if (!data) return res.status(404).json({ message: "ບໍ່ພົບຂໍ້ມູນ" });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const updateDepartment = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { departmentName } = req.body;

    const data = await service.updateDepartment(departmentName, id);
    res.status(200).json({ message: "ອັບເດດສຳເລັດ", data });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteDepartment = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await service.deleteDepartment(id);
    res.status(200).json({ message: "ລຶບສຳເລັດ" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

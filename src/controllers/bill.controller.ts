import * as billService from "../services/bill.service";
import { Request, Response } from "express";

export const getBills = async (req: Request, res: Response) => {
  try {
    const bills = await billService.getBills();
    res.status(200).json(bills);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "ບໍ່ພົບຂໍ້ມູນ", error });
  }
};

export const getBillById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "ID ບໍ່ຖືກຕ້ອງ" });
    }
    const bill = await billService.getBillById(id);
    if (!bill) {
      return res.status(404).json({ message: "ບໍ່ພົບບິນ" });
    }
    res.status(200).json(bill);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const createBill = async (req: Request, res: Response) => {
  try {
    const { employeeID, billDate } = req.body;
    if (!employeeID) {
      return res.status(400).json({ message: "ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບ" });
    }
    const bill = await billService.createBill(
      employeeID,
      billDate ? new Date(billDate) : undefined
    );
    return res.status(201).json({
      message: "ສ້າງບິນສຳເລັດ",
      data: bill,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error });
  }
};

export const deleteBill = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const bill = await billService.getBillById(id);
    if (!bill) {
      return res.status(404).json({ message: "ບໍ່ພົບບິນ" });
    }
    await billService.deleteBill(id);
    res.json({ message: "ລຶບບິນສຳເລັດ" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

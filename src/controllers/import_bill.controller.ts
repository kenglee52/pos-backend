import * as importBillService from "../services/import_bill.service";
import { Request, Response } from "express";
export const getImportBills = async (req: Request, res: Response) => {
  try {
    const importBills = await importBillService.getImportBills();
    res.status(200).json(importBills);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "ບໍ່ພົບຂໍ້ມູນ", error });
  }
};

export const getImportBillById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "ID ບໍ່ຖືກຕ້ອງ" });
    }
    const importBill = await importBillService.getImportBillById(id);
    if (!importBill) {
      return res.status(404).json({ message: "ບໍ່ພົບບິນນຳເຂົ້າ" });
    }
    res.status(200).json(importBill);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const createImportBill = async (req: Request, res: Response) => {
  try {
    const { supplierID, importDate, totalAmount, status } = req.body;
    if (!supplierID || !importDate || totalAmount === undefined) {
      return res.status(400).json({ message: "ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບ" });
    }
    const importBill = await importBillService.createImportBill(
      supplierID,
      new Date(importDate),
      totalAmount,
      status
    );
    return res.status(201).json({
      message: "ສ້າງບິນນຳເຂົ້າສຳເລັດ",
      data: importBill,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error });
  }
};

export const updateImportBill = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { supplierID, importDate, totalAmount, status } = req.body;
    if (!supplierID || !importDate || totalAmount === undefined) {
      return res.status(400).json({ message: "ຂໍ້ມູນຫ້າມເປັນຄ່າຫວ່າງ" });
    }
    const oldImportBill = await importBillService.getImportBillById(id);
    if (!oldImportBill) {
      return res.status(404).json({ message: "ບໍ່ພົບບິນນຳເຂົ້າ" });
    }
    const updated = await importBillService.updateImportBill(
      id,
      supplierID,
      new Date(importDate),
      totalAmount,
      status
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

export const deleteImportBill = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const importBill = await importBillService.getImportBillById(id);
    if (!importBill) {
      return res.status(404).json({ message: "ບໍ່ພົບບິນນຳເຂົ້າ" });
    }
    await importBillService.deleteImportBill(id);
    res.json({ message: "ລຶບບິນນຳເຂົ້າສຳເລັດ" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

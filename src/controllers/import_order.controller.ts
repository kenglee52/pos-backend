import * as importOrderService from "../services/import_order.service";
import { Request , Response } from "express";

export const getImportOrders = async (req: Request, res: Response) => {
  try {
    const importOrders = await importOrderService.getImportOrders();
    res.status(200).json(importOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "ບໍ່ພົບຂໍ້ມູນ", error });
  }
};

export const getImportOrderById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "ID ບໍ່ຖືກຕ້ອງ" });
    }
    const importOrder = await importOrderService.getImportOrderById(id);
    if (!importOrder) {
      return res.status(404).json({ message: "ບໍ່ພົບລາຍການນຳເຂົ້າ" });
    }
    res.status(200).json(importOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const createImportOrder = async (req: Request, res: Response) => {
  try {
    const { importBillID, productID, importQty, importPrice, total } = req.body;
    if (!importBillID || !productID || !importQty || !importPrice || !total) {
      return res.status(400).json({ message: "ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບ" });
    }
    const importOrder = await importOrderService.createImportOrder(
      importBillID,
      productID,
      importQty,
      importPrice,
      total
    );
    return res.status(201).json({
      message: "ສ້າງລາຍການນຳເຂົ້າສຳເລັດ",
      data: importOrder,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error });
  }
};

export const updateImportOrder = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { importBillID, productID, importQty, importPrice, total } = req.body;
    if (!importBillID || !productID || !importQty || !importPrice || !total) {
      return res.status(400).json({ message: "ຂໍ້ມູນຫ້າມເປັນຄ່າຫວ່າງ" });
    }
    const oldImportOrder = await importOrderService.getImportOrderById(id);
    if (!oldImportOrder) {
      return res.status(404).json({ message: "ບໍ່ພົບລາຍການນຳເຂົ້າ" });
    }
    const updated = await importOrderService.updateImportOrder(
      id,
      importBillID,
      productID,
      importQty,
      importPrice,
      total
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

export const deleteImportOrder = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const importOrder = await importOrderService.getImportOrderById(id);
    if (!importOrder) {
      return res.status(404).json({ message: "ບໍ່ພົບລາຍການນຳເຂົ້າ" });
    }
    await importOrderService.deleteImportOrder(id);
    res.json({ message: "ລຶບລາຍການນຳເຂົ້າສຳເລັດ" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
import * as onlineBillService from "../services/online_bill.service";
import { Request, Response } from "express";

export const getOnlineBills = async (req: Request, res: Response) => {
  try {
    const onlineBills = await onlineBillService.getOnlineBills();
    res.status(200).json(onlineBills);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "ບໍ່ພົບຂໍ້ມູນ", error });
  }
};

export const getOnlineBillById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "ID ບໍ່ຖືກຕ້ອງ" });
    }
    const onlineBill = await onlineBillService.getOnlineBillById(id);
    if (!onlineBill) {
      return res.status(404).json({ message: "ບໍ່ພົບບິນອອນລາຍ" });
    }
    res.status(200).json(onlineBill);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const createOnlineBill = async (req: Request, res: Response) => {
  try {
    const { customerID, logisticType, logisticName, onlineBillDate, send } = req.body;
    if (!customerID || !logisticType || !logisticName) {
      return res.status(400).json({ message: "ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບ" });
    }
    const onlineBill = await onlineBillService.createOnlineBill(
      customerID,
      logisticType,
      logisticName,
      onlineBillDate ? new Date(onlineBillDate) : undefined,
      send
    );
    return res.status(201).json({
      message: "ສ້າງບິນອອນລາຍສຳເລັດ",
      data: onlineBill,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error });
  }
};

export const updateOnlineBill = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { customerID, logisticType, logisticName, onlineBillDate, send } = req.body;
    if (!customerID || !logisticType || !logisticName) {
      return res.status(400).json({ message: "ຂໍ້ມູນຫ້າມເປັນຄ່າຫວ່າງ" });
    }
    const oldOnlineBill = await onlineBillService.getOnlineBillById(id);
    if (!oldOnlineBill) {
      return res.status(404).json({ message: "ບໍ່ພົບບິນອອນລາຍ" });
    }
    const updated = await onlineBillService.updateOnlineBill(
      id,
      customerID,
      logisticType,
      logisticName,
      onlineBillDate ? new Date(onlineBillDate) : undefined,
      send
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

export const deleteOnlineBill = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const onlineBill = await onlineBillService.getOnlineBillById(id);
    if (!onlineBill) {
      return res.status(404).json({ message: "ບໍ່ພົບບິນອອນລາຍ" });
    }
    await onlineBillService.deleteOnlineBill(id);
    res.json({ message: "ລຶບບິນອອນລາຍສຳເລັດ" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
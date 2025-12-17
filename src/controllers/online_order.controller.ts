import * as onlineOrderService from "../services/online_order.service";
import { Request, Response } from "express";

export const getOnlineOrders = async (req: Request, res: Response) => {
  try {
    const onlineOrders = await onlineOrderService.getOnlineOrders();
    res.status(200).json(onlineOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "ບໍ່ພົບຂໍ້ມູນ", error });
  }
};

export const getOnlineOrderById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "ID ບໍ່ຖືກຕ້ອງ" });
    }
    const onlineOrder = await onlineOrderService.getOnlineOrderById(id);
    if (!onlineOrder) {
      return res.status(404).json({ message: "ບໍ່ພົບລາຍການສັ່ງຊື້ອອນລາຍ" });
    }
    res.status(200).json(onlineOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const createOnlineOrder = async (req: Request, res: Response) => {
  try {
    const { onlineBillID, productID, saleQty, total } = req.body;
    if (!onlineBillID || !productID) {
      return res.status(400).json({ message: "ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບ" });
    }
    const onlineOrder = await onlineOrderService.createOnlineOrder(
      onlineBillID,
      productID,
      saleQty,
      total
    );
    return res.status(201).json({
      message: "ສ້າງລາຍການສັ່ງຊື້ອອນລາຍສຳເລັດ",
      data: onlineOrder,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error });
  }
};

export const updateOnlineOrder = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { onlineBillID, productID, saleQty, total } = req.body;
    if (!onlineBillID || !productID) {
      return res.status(400).json({ message: "ຂໍ້ມູນຫ້າມເປັນຄ່າຫວ່າງ" });
    }
    const oldOnlineOrder = await onlineOrderService.getOnlineOrderById(id);
    if (!oldOnlineOrder) {
      return res.status(404).json({ message: "ບໍ່ພົບລາຍການສັ່ງຊື້ອອນລາຍ" });
    }
    const updated = await onlineOrderService.updateOnlineOrder(
      id,
      onlineBillID,
      productID,
      saleQty,
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

export const deleteOnlineOrder = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const onlineOrder = await onlineOrderService.getOnlineOrderById(id);
    if (!onlineOrder) {
      return res.status(404).json({ message: "ບໍ່ພົບລາຍການສັ່ງຊື້ອອນລາຍ" });
    }
    await onlineOrderService.deleteOnlineOrder(id);
    res.json({ message: "ລຶບລາຍການສັ່ງຊື້ອອນລາຍສຳເລັດ" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
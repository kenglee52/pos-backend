import * as orderService from "../services/order.service";
import { Request, Response } from "express";

export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await orderService.getOrders();
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "ບໍ່ພົບຂໍ້ມູນ", error });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "ID ບໍ່ຖືກຕ້ອງ" });
    }
    const order = await orderService.getOrderById(id);
    if (!order) {
      return res.status(404).json({ message: "ບໍ່ພົບລາຍການສັ່ງຊື້" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { billID, productID, saleQty, total } = req.body;
    if (!billID || !productID) {
      return res.status(400).json({ message: "ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບ" });
    }
    const order = await orderService.createOrder(billID, productID, saleQty, total);
    return res.status(201).json({
      message: "ສ້າງລາຍການສັ່ງຊື້ສຳເລັດ",
      data: order,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { billID, productID, saleQty, total } = req.body;
    if (!billID || !productID) {
      return res.status(400).json({ message: "ຂໍ້ມູນຫ້າມເປັນຄ່າຫວ່າງ" });
    }
    const oldOrder = await orderService.getOrderById(id);
    if (!oldOrder) {
      return res.status(404).json({ message: "ບໍ່ພົບລາຍການສັ່ງຊື້" });
    }
    const updated = await orderService.updateOrder(id, billID, productID, saleQty, total);
    res.status(200).json({
      message: "ອັບເດດສຳເລັດ",
      data: updated,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const order = await orderService.getOrderById(id);
    if (!order) {
      return res.status(404).json({ message: "ບໍ່ພົບລາຍການສັ່ງຊື້" });
    }
    await orderService.deleteOrder(id);
    res.json({ message: "ລຶບລາຍການສັ່ງຊື້ສຳເລັດ" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

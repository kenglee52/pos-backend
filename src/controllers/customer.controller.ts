import { Request, Response } from "express";
import * as customerService from "../services/customer.service";

export const createCustomer = async (req: Request, res: Response) => {
  try {
    const { customerName, customerTel, customerPassword } = req.body;
    if (!customerName || !customerTel || !customerPassword) {
      return res.status(400).json({
        message: "ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບ",
      });
    }
    const telExist = await customerService.checkTel(customerTel);
    if (telExist) {
      return res.status(409).json({
        message: "ເບີໂທນີ້ຖືກໃຊ້ແລ້ວ",
      });
    }

    const customer = await customerService.createCustomer(
      customerName,
      customerTel,
      customerPassword
    );

    return res.status(201).json({
      message: "ສ້າງລູກຄ້າສຳເລັດ",
      data: customer,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      error,
    });
  }
};


export const getCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await customerService.getCustomers();
    res.status(200).json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "ບໍ່ພົບຂໍ້ມູນ",error
    });
  }
};


export const getCustomerById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "ID ບໍ່ຖືກຕ້ອງ" });
    }

    const customer = await customerService.getCustomerById(id);

    if (!customer) {
      return res.status(404).json({ message: "ບໍ່ພົບລູກຄ້າ" });
    }

    res.status(200).json(customer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};


export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { customerName, customerTel, customerPassword } = req.body;

    if (!customerName || !customerTel || !customerPassword) {
      return res.status(400).json({
        message: "ຂໍ້ມູນຫ້າມເປັນຄ່າຫວ່າງ",
      });
    }

    const oldCustomer = await customerService.getCustomerById(id);
    if (!oldCustomer) {
      return res.status(404).json({ message: "ບໍ່ພົບລູກຄ້າ" });
    }

    const telExist = await customerService.checkTel(customerTel);
    if (telExist && telExist.customerID !== id) {
      return res.status(409).json({
        message: "ເບີໂທນີ້ຖືກໃຊ້ແລ້ວ",
      });
    }

    const updated = await customerService.updateCustomer(
      customerName,
      customerTel,
      customerPassword,
      id
    );

    res.status(200).json({
      message: "ອັບເດດສຳເລັດ",
      data: updated,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" , error});
  }
};


export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const customer = await customerService.getCustomerById(id);
    if (!customer) {
      return res.status(404).json({ message: "ບໍ່ພົບລູກຄ້າ" });
    }

    await customerService.deleteCustomer(id);

    res.json({
      message: "ລຶບລູກຄ້າສຳເລັດ",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

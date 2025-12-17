import { Request, Response } from "express";
import * as supplierService from "../services/supplier.service";
export const getSuppliers = async (req: Request, res: Response) => {
  try {
    const suppliers = await supplierService.getSuppliers();
    res.status(200).json(suppliers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "ບໍ່ພົບຂໍ້ມູນ", error });
  }
};

export const getSupplierById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "ID ບໍ່ຖືກຕ້ອງ" });
    }
    const supplier = await supplierService.getSupplierById(id);
    if (!supplier) {
      return res.status(404).json({ message: "ບໍ່ພົບຜູ້ສະໜອງ" });
    }
    res.status(200).json(supplier);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const createSupplier = async (req: Request, res: Response) => {
  try {
    const {
      supplierName,
      supplierTel,
      supplierEmail,
      supplierAddress,
      contactPerson,
    } = req.body;

    if (
      !supplierName ||
      !supplierTel ||
      !supplierEmail ||
      !supplierAddress ||
      !contactPerson
    ) {
      return res.status(400).json({ message: "ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບ" });
    }

    const telExist = await supplierService.checkSupplierTel(supplierTel);
    if (telExist) {
      return res.status(409).json({ message: "ເບີໂທນີ້ຖືກໃຊ້ແລ້ວ" });
    }

    const emailExist = await supplierService.checkSupplierEmail(supplierEmail);
    if (emailExist) {
      return res.status(409).json({ message: "ອີເມວນີ້ຖືກໃຊ້ແລ້ວ" });
    }

    const supplier = await supplierService.createSupplier(
      supplierName,
      supplierTel,
      supplierEmail,
      supplierAddress,
      contactPerson
    );

    return res.status(201).json({
      message: "ສ້າງຜູ້ສະໜອງສຳເລັດ",
      data: supplier,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error });
  }
};

export const updateSupplier = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const {
      supplierName,
      supplierTel,
      supplierEmail,
      supplierAddress,
      contactPerson,
    } = req.body;

    if (
      !supplierName ||
      !supplierTel ||
      !supplierEmail ||
      !supplierAddress ||
      !contactPerson
    ) {
      return res.status(400).json({ message: "ຂໍ້ມູນຫ້າມເປັນຄ່າຫວ່າງ" });
    }

    const oldSupplier = await supplierService.getSupplierById(id);
    if (!oldSupplier) {
      return res.status(404).json({ message: "ບໍ່ພົບຜູ້ສະໜອງ" });
    }

    const telExist = await supplierService.checkSupplierTel(supplierTel);
    if (telExist && telExist.supplierID !== id) {
      return res.status(409).json({ message: "ເບີໂທນີ້ຖືກໃຊ້ແລ້ວ" });
    }

    const emailExist = await supplierService.checkSupplierEmail(supplierEmail);
    if (emailExist && emailExist.supplierID !== id) {
      return res.status(409).json({ message: "ອີເມວນີ້ຖືກໃຊ້ແລ້ວ" });
    }

    const updated = await supplierService.updateSupplier(
      id,
      supplierName,
      supplierTel,
      supplierEmail,
      supplierAddress,
      contactPerson
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

export const deleteSupplier = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const supplier = await supplierService.getSupplierById(id);
    if (!supplier) {
      return res.status(404).json({ message: "ບໍ່ພົບຜູ້ສະໜອງ" });
    }
    await supplierService.deleteSupplier(id);
    res.json({ message: "ລຶບຜູ້ສະໜອງສຳເລັດ" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

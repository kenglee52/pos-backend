import * as unitService from "../services/unit.service";
import { Request, Response } from "express";


export const getUnits = async (req: Request, res: Response) => {
  try {
    const units = await unitService.getUnits();
    res.status(200).json(units);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "ບໍ່ພົບຂໍ້ມູນ", error });
  }
};

export const getUnitById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "ID ບໍ່ຖືກຕ້ອງ" });
    }
    const unit = await unitService.getUnitById(id);
    if (!unit) {
      return res.status(404).json({ message: "ບໍ່ພົບຫົວໜ່ວຍ" });
    }
    res.status(200).json(unit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const createUnit = async (req: Request, res: Response) => {
  try {
    const { unitName } = req.body;
    if (!unitName) {
      return res.status(400).json({ message: "ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບ" });
    }
    const nameExist = await unitService.checkUnitName(unitName);
    if (nameExist) {
      return res.status(409).json({ message: "ຊື່ຫົວໜ່ວຍນີ້ຖືກໃຊ້ແລ້ວ" });
    }
    const unit = await unitService.createUnit(unitName);
    return res.status(201).json({
      message: "ສ້າງຫົວໜ່ວຍສຳເລັດ",
      data: unit,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error });
  }
};

export const updateUnit = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { unitName } = req.body;
    if (!unitName) {
      return res.status(400).json({ message: "ຂໍ້ມູນຫ້າມເປັນຄ່າຫວ່າງ" });
    }
    const oldUnit = await unitService.getUnitById(id);
    if (!oldUnit) {
      return res.status(404).json({ message: "ບໍ່ພົບຫົວໜ່ວຍ" });
    }
    const nameExist = await unitService.checkUnitName(unitName);
    if (nameExist && nameExist.unitID !== id) {
      return res.status(409).json({ message: "ຊື່ຫົວໜ່ວຍນີ້ຖືກໃຊ້ແລ້ວ" });
    }
    const updated = await unitService.updateUnit(id, unitName);
    res.status(200).json({
      message: "ອັບເດດສຳເລັດ",
      data: updated,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteUnit = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const unit = await unitService.getUnitById(id);
    if (!unit) {
      return res.status(404).json({ message: "ບໍ່ພົບຫົວໜ່ວຍ" });
    }
    await unitService.deleteUnit(id);
    res.json({ message: "ລຶບຫົວໜ່ວຍສຳເລັດ" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

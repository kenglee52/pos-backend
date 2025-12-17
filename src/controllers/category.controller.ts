import * as categoryService from "../services/category.service";
import { Request, Response } from "express";


export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await categoryService.getCategories();
    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "ບໍ່ພົບຂໍ້ມູນ", error });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "ID ບໍ່ຖືກຕ້ອງ" });
    }
    const category = await categoryService.getCategoryById(id);
    if (!category) {
      return res.status(404).json({ message: "ບໍ່ພົບປະເພດ" });
    }
    res.status(200).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { categoryName } = req.body;
    if (!categoryName) {
      return res.status(400).json({ message: "ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບ" });
    }
    const nameExist = await categoryService.checkCategoryName(categoryName);
    if (nameExist) {
      return res.status(409).json({ message: "ຊື່ປະເພດນີ້ຖືກໃຊ້ແລ້ວ" });
    }
    const category = await categoryService.createCategory(categoryName);
    return res.status(201).json({
      message: "ສ້າງປະເພດສຳເລັດ",
      data: category,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { categoryName } = req.body;
    if (!categoryName) {
      return res.status(400).json({ message: "ຂໍ້ມູນຫ້າມເປັນຄ່າຫວ່າງ" });
    }
    const oldCategory = await categoryService.getCategoryById(id);
    if (!oldCategory) {
      return res.status(404).json({ message: "ບໍ່ພົບປະເພດ" });
    }
    const nameExist = await categoryService.checkCategoryName(categoryName);
    if (nameExist && nameExist.categoryID !== id) {
      return res.status(409).json({ message: "ຊື່ປະເພດນີ້ຖືກໃຊ້ແລ້ວ" });
    }
    const updated = await categoryService.updateCategory(id, categoryName);
    res.status(200).json({
      message: "ອັບເດດສຳເລັດ",
      data: updated,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const category = await categoryService.getCategoryById(id);
    if (!category) {
      return res.status(404).json({ message: "ບໍ່ພົບປະເພດ" });
    }
    await categoryService.deleteCategory(id);
    res.json({ message: "ລຶບປະເພດສຳເລັດ" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
import * as productService from "../services/product.service";
import { Request, Response } from "express";


export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.getProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "ບໍ່ພົບຂໍ້ມູນ", error });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "ID ບໍ່ຖືກຕ້ອງ" });
    }
    const product = await productService.getProductById(id);
    if (!product) {
      return res.status(404).json({ message: "ບໍ່ພົບສິນຄ້າ" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};



export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      productName,
      categoryID,
      unitID,
      stockQty,
      price,
      importPrice,
      manufacture,
      expiry,
      description,
    } = req.body;

    const file = req.file as any;

    if (
      !productName ||
      !categoryID ||
      !unitID ||
      stockQty === undefined ||
      !price ||
      !importPrice ||
      !file
    ) {
      return res.status(400).json({ message: "ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບ" });
    }

    const nameExist = await productService.checkProductName(productName);
    if (nameExist) {
      return res.status(409).json({ message: "ຊື່ສິນຄ້ານີ້ຖືກໃຊ້ແລ້ວ" });
    }

    const imageUrl = file.path;

    const product = await productService.createProduct(
      productName,
      Number(categoryID),
      Number(unitID),
      Number(stockQty),
      Number(price),
      imageUrl,
      Number(importPrice),
      manufacture ? new Date(manufacture) : undefined,
      expiry ? new Date(expiry) : undefined,
      description
    );

    return res.status(201).json({
      message: "ສ້າງສິນຄ້າສຳເລັດ",
      data: product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};


export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const {
      productName,
      categoryID,
      unitID,
      stockQty,
      price,
      image,
      importPrice,
      manufacture,
      expiry,
      description,
    } = req.body;

    if (
      !productName ||
      !categoryID ||
      !unitID ||
      stockQty === undefined ||
      !price ||
      !image ||
      !importPrice
    ) {
      return res.status(400).json({ message: "ຂໍ້ມູນຫ້າມເປັນຄ່າຫວ່າງ" });
    }

    const oldProduct = await productService.getProductById(id);
    if (!oldProduct) {
      return res.status(404).json({ message: "ບໍ່ພົບສິນຄ້າ" });
    }

    const nameExist = await productService.checkProductName(productName);
    if (nameExist && nameExist.productID !== id) {
      return res.status(409).json({ message: "ຊື່ສິນຄ້ານີ້ຖືກໃຊ້ແລ້ວ" });
    }

    const updated = await productService.updateProduct(
      id,
      productName,
      categoryID,
      unitID,
      stockQty,
      price,
      image,
      importPrice,
      manufacture ? new Date(manufacture) : undefined,
      expiry ? new Date(expiry) : undefined,
      description
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

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const product = await productService.getProductById(id);
    if (!product) {
      return res.status(404).json({ message: "ບໍ່ພົບສິນຄ້າ" });
    }
    await productService.deleteProduct(id);
    res.json({ message: "ລຶບສິນຄ້າສຳເລັດ" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

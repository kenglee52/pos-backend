import * as productController from "../controllers/product.controller";
import { Router } from "express";
const productRouter = Router();

productRouter.get("/", productController.getProducts);
productRouter.get("/:id", productController.getProductById);
productRouter.post("/", productController.createProduct);
productRouter.put("/:id", productController.updateProduct);
productRouter.delete("/:id", productController.deleteProduct);

export default productRouter;
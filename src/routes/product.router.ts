import * as productController from "../controllers/product.controller";
import { Router } from "express";
const productRouter = Router();

productRouter.get("/product", productController.getProducts);
productRouter.get("/product/:id", productController.getProductById);
productRouter.post("/product", productController.createProduct);
productRouter.put("/product/:id", productController.updateProduct);
productRouter.delete("/product/:id", productController.deleteProduct);

export default productRouter;
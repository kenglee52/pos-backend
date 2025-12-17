import * as supplierController from "../controllers/supplier.controller";
import { Router } from "express";
const supplierRouter = Router();

supplierRouter.get("/supplier", supplierController.getSuppliers);
supplierRouter.get("/supplier/:id", supplierController.getSupplierById);
supplierRouter.post("/supplier", supplierController.createSupplier);
supplierRouter.put("/supplier/:id", supplierController.updateSupplier);
supplierRouter.delete("/supplier/:id", supplierController.deleteSupplier);

export default supplierRouter;
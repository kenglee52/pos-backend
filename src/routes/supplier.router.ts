import * as supplierController from "../controllers/supplier.controller";
import { Router } from "express";
const supplierRouter = Router();

supplierRouter.get("/", supplierController.getSuppliers);
supplierRouter.get("/:id", supplierController.getSupplierById);
supplierRouter.post("/", supplierController.createSupplier);
supplierRouter.put("/:id", supplierController.updateSupplier);
supplierRouter.delete("/:id", supplierController.deleteSupplier);

export default supplierRouter;
import { Router } from "express";
import * as importBillController from "../controllers/import_bill.controller";
const importBillRouter = Router();

importBillRouter.get("/", importBillController.getImportBills);
importBillRouter.get("/:id", importBillController.getImportBillById);
importBillRouter.post("/", importBillController.createImportBill);
importBillRouter.put("/:id", importBillController.updateImportBill);
importBillRouter.delete("/:id", importBillController.deleteImportBill);

export default importBillRouter;
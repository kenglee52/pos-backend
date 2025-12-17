import { Router } from "express";
import * as importBillController from "../controllers/import_bill.controller";
const importBillRouter = Router();

importBillRouter.get("/import_bill", importBillController.getImportBills);
importBillRouter.get("/import_bill/:id", importBillController.getImportBillById);
importBillRouter.post("/import_bill/", importBillController.createImportBill);
importBillRouter.put("/import_bill/:id", importBillController.updateImportBill);
importBillRouter.delete("/import_bill/:id", importBillController.deleteImportBill);

export default importBillRouter;
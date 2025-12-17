import * as importOrderController from "../controllers/import_order.controller";
import { Router } from "express";

const importOrderRouter = Router();

importOrderRouter.get("/import_order", importOrderController.getImportOrders);
importOrderRouter.get("/import_order/:id", importOrderController.getImportOrderById);
importOrderRouter.post("/import_order", importOrderController.createImportOrder);
importOrderRouter.put("/import_order/:id", importOrderController.updateImportOrder);
importOrderRouter.delete("/import_order/:id", importOrderController.deleteImportOrder);

export default importOrderRouter;
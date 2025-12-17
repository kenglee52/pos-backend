import * as importOrderController from "../controllers/import_order.controller";
import { Router } from "express";

const importOrderRouter = Router();

importOrderRouter.get("/", importOrderController.getImportOrders);
importOrderRouter.get("/:id", importOrderController.getImportOrderById);
importOrderRouter.post("/", importOrderController.createImportOrder);
importOrderRouter.put("/:id", importOrderController.updateImportOrder);
importOrderRouter.delete("/:id", importOrderController.deleteImportOrder);

export default importOrderRouter;
import * as onlineBillController from "../controllers/online_bill.controller";
import { Router } from "express";
const onlineBillRouter = Router();

onlineBillRouter.get("/", onlineBillController.getOnlineBills);
onlineBillRouter.get("/:id", onlineBillController.getOnlineBillById);
onlineBillRouter.post("/", onlineBillController.createOnlineBill);
onlineBillRouter.put("/:id", onlineBillController.updateOnlineBill);
onlineBillRouter.delete("/:id", onlineBillController.deleteOnlineBill);

export default onlineBillRouter;
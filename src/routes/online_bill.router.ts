import * as onlineBillController from "../controllers/online_bill.controller";
import { Router } from "express";
const onlineBillRouter = Router();

onlineBillRouter.get("/online_bill", onlineBillController.getOnlineBills);
onlineBillRouter.get("/online_bill/:id", onlineBillController.getOnlineBillById);
onlineBillRouter.post("/online_bill", onlineBillController.createOnlineBill);
onlineBillRouter.put("/online_bill/:id", onlineBillController.updateOnlineBill);
onlineBillRouter.delete("/online_bill/:id", onlineBillController.deleteOnlineBill);

export default onlineBillRouter;
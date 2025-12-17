import { Router } from "express";
import * as onlineOrderController from "../controllers/online_order.controller"

const onlineOrderRouter = Router();

onlineOrderRouter.get("/", onlineOrderController.getOnlineOrders);
onlineOrderRouter.get("/:id", onlineOrderController.getOnlineOrderById);
onlineOrderRouter.post("/", onlineOrderController.createOnlineOrder);
onlineOrderRouter.put("/:id", onlineOrderController.updateOnlineOrder);
onlineOrderRouter.delete("/:id", onlineOrderController.deleteOnlineOrder);

export default onlineOrderRouter;
import { Router } from "express";
import * as onlineOrderController from "../controllers/online_order.controller"

const onlineOrderRouter = Router();

onlineOrderRouter.get("/online_order", onlineOrderController.getOnlineOrders);
onlineOrderRouter.get("/online_order/:id", onlineOrderController.getOnlineOrderById);
onlineOrderRouter.post("/online_order", onlineOrderController.createOnlineOrder);
onlineOrderRouter.put("/online_order/:id", onlineOrderController.updateOnlineOrder);
onlineOrderRouter.delete("/online_order/:id", onlineOrderController.deleteOnlineOrder);

export default onlineOrderRouter;
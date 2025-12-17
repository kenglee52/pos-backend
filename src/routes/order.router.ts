import * as orderController from "../controllers/order.controller";
import { Router } from "express";

const orderRouter = Router();

orderRouter.get("/", orderController.getOrders);
orderRouter.get("/:id", orderController.getOrderById);
orderRouter.post("/", orderController.createOrder);
orderRouter.put("/:id", orderController.updateOrder);
orderRouter.delete("/:id", orderController.deleteOrder);

export default orderRouter
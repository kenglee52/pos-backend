import * as orderController from "../controllers/order.controller";
import { Router } from "express";

const orderRouter = Router();

orderRouter.get("/order", orderController.getOrders);
orderRouter.get("/order/:id", orderController.getOrderById);
orderRouter.post("/order/", orderController.createOrder);
orderRouter.put("/order/:id", orderController.updateOrder);
orderRouter.delete("/order/:id", orderController.deleteOrder);

export default orderRouter
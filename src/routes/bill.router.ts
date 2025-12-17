import * as billController from "../controllers/bill.controller";
import { Router } from "express";

const billRouter = Router();

billRouter.get("/", billController.getBills);
billRouter.get("/:id", billController.getBillById);
billRouter.post("/", billController.createBill);
billRouter.delete("/:id", billController.deleteBill);

export default billRouter;
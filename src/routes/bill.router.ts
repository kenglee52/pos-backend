import * as billController from "../controllers/bill.controller";
import { Router } from "express";

const billRouter = Router();

billRouter.get("/bill", billController.getBills);
billRouter.get("/biil/:id", billController.getBillById);
billRouter.post("/bill", billController.createBill);
billRouter.delete("/bill/:id", billController.deleteBill);

export default billRouter;
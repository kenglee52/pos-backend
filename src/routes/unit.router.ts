import * as unitController from "../controllers/unit.controller";
import { Router } from "express";

const unitRouter = Router();

unitRouter.get("/unit", unitController.getUnits);
unitRouter.get("/unit/:id", unitController.getUnitById);
unitRouter.post("/unit", unitController.createUnit);
unitRouter.put("/unit/:id", unitController.updateUnit);
unitRouter.delete("/unit/:id", unitController.deleteUnit);

export default unitRouter
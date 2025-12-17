import * as unitController from "../controllers/unit.controller";
import { Router } from "express";

const unitRouter = Router();

unitRouter.get("/", unitController.getUnits);
unitRouter.get("/:id", unitController.getUnitById);
unitRouter.post("/", unitController.createUnit);
unitRouter.put("/:id", unitController.updateUnit);
unitRouter.delete("/:id", unitController.deleteUnit);

export default unitRouter
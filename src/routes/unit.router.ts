import { Router } from "express";
import * as UnitController from "../controllers/unit.controller";

const router = Router();

router.post("/unit", UnitController.createUnit);

export default router;
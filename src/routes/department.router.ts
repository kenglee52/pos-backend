import { Router } from "express";
import * as controller from "../controllers/department.controller";

const router = Router();

router.post("/", controller.createDepartment);
router.get("/", controller.getDepartments);
router.get("/:id", controller.getDepartmentById);
router.put("/:id", controller.updateDepartment);
router.delete("/:id", controller.deleteDepartment);

export default router;

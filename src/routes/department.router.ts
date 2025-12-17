import { Router } from "express";
import * as controller from "../controllers/department.controller";

const router = Router();

router.post("/department", controller.createDepartment);
router.get("/department", controller.getDepartments);
router.get("/department/:id", controller.getDepartmentById);
router.put("/department/:id", controller.updateDepartment);
router.delete("/department/:id", controller.deleteDepartment);

export default router;

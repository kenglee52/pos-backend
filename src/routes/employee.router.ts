import { Router } from "express";
import * as employeeController from "../controllers/employee.controller";
const employeeRouter = Router();

employeeRouter.get("/employee", employeeController.getEmployees);
employeeRouter.get("/employee/:id", employeeController.getEmployeeById);
employeeRouter.post("/employee", employeeController.createEmployee);
employeeRouter.put("/employee/:id", employeeController.updateEmployee);
employeeRouter.delete("/employee/:id", employeeController.deleteEmployee);
employeeRouter.post("/employee-login", employeeController.loginEmployee);

export default employeeRouter ;
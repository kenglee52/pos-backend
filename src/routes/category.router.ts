import { Router } from "express";
import * as categoryController from "../controllers/category.controller";

const categoryRouter = Router();

categoryRouter.get("/category", categoryController.getCategories);
categoryRouter.get("/category/:id", categoryController.getCategoryById);
categoryRouter.post("/category", categoryController.createCategory);
categoryRouter.put("/category/:id", categoryController.updateCategory);
categoryRouter.delete("/category/:id", categoryController.deleteCategory);

export default categoryRouter;
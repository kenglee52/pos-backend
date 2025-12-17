import { Request, Response } from "express";
import * as UnitService from "../services/unit.service";

export const createUnit = async(req: Request, res: Response) =>{
   const {unitName} = req.body;
   try {
         if(!unitName){
            return res.status(404).json({
                message: "Please not null",
            })
         }
         const exitsValue = await UnitService.checkUnique(unitName);
         if(exitsValue){
              return res.status(400).json({
                   meesage: "Please not unique"
              });
         }
         const result = await UnitService.createUnit(unitName);
         res.status(201).json(result);
   } catch (error) {
         console.error(error);
         res.status(500).send({
             message: "Server error", error
         })
   }
}
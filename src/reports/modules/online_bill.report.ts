import { db } from "../../config/database";
import { Request, Response } from "express";

export const getOnlineBillByCustomerId = async(req: Request, res: Response) =>{
         const id = req.params.id;
         try {
            const [rows] = await db.query("SELECT * FROM online_bill WHERE customerID = ? ORDER BY onlineBillID DESC", [id]);
            res.status(200).json(rows); 
         } catch (error) {
                  console.log(error);
            res.status(500).send({
                  message:"Server error",
                  error
            });
         }
}
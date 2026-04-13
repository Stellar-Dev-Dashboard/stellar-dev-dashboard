import { Request, Response, NextFunction } from "express";
import { getAccount } from "../services/horizonService";

export async function getWalletInfo(req: Request, res: Response, next: NextFunction) {
  try {
    const { address } = req.params;
    if (!address) {
      res.status(400).json({ error: "Address is required" });
      return;
    }
    const info = await getAccount(address);
    res.json(info);
  } catch (err) {
    next(err);
  }
}

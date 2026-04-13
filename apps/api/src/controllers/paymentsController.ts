import { Request, Response, NextFunction } from "express";
import { submitXDR } from "../services/horizonService";

export async function submitPayment(req: Request, res: Response, next: NextFunction) {
  try {
    const { xdr } = req.body;
    if (!xdr) {
      res.status(400).json({ error: "xdr is required" });
      return;
    }
    const result = await submitXDR(xdr);
    res.json(result);
  } catch (err: unknown) {
    // Forward Horizon-specific error details
    const horizonErr = err as { response?: { data?: unknown } };
    if (horizonErr?.response?.data) {
      res.status(400).json({ error: "Transaction failed", details: horizonErr.response.data });
      return;
    }
    next(err);
  }
}

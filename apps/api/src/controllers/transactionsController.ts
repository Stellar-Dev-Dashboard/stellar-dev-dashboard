import { Request, Response, NextFunction } from "express";
import { getPayments, getTransactions } from "../services/horizonService";

export async function listPayments(req: Request, res: Response, next: NextFunction) {
  try {
    const { address } = req.params;
    const limit = Number(req.query.limit) || 20;
    const payments = await getPayments(address, limit);
    res.json({ payments, count: payments.length });
  } catch (err) {
    next(err);
  }
}

export async function listTransactions(req: Request, res: Response, next: NextFunction) {
  try {
    const { address } = req.params;
    const limit = Number(req.query.limit) || 20;
    const transactions = await getTransactions(address, limit);
    res.json({ transactions, count: transactions.length });
  } catch (err) {
    next(err);
  }
}

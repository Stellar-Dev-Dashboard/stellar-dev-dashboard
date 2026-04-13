import { Request, Response, NextFunction } from "express";

export function requireBody(...fields: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const missing = fields.filter((f) => !req.body[f]);
    if (missing.length > 0) {
      res.status(400).json({ error: `Missing fields: ${missing.join(", ")}` });
      return;
    }
    next();
  };
}

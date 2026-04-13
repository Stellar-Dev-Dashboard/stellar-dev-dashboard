import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

import walletRouter from "./routes/wallet";
import transactionsRouter from "./routes/transactions";
import paymentsRouter from "./routes/payments";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security & parsing
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:3000" }));
app.use(express.json());
app.use(morgan("dev"));

// Rate limiting
const limiter = rateLimit({ windowMs: 60_000, max: 100 });
app.use("/api", limiter);

// Routes
app.use("/api/wallet", walletRouter);
app.use("/api/transactions", transactionsRouter);
app.use("/api/payments", paymentsRouter);

// Health check
app.get("/health", (_, res) => {
  res.json({ status: "ok", network: process.env.STELLAR_NETWORK || "testnet" });
});

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Stellar Dev Dashboard API running on port ${PORT}`);
  console.log(`   Network: ${process.env.STELLAR_NETWORK || "testnet"}`);
});

export default app;

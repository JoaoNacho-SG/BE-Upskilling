import dotenv from "dotenv";
import express from "express";
import userRoutes from "./routes/user";
import productRoutes from "./routes/products";
import { Request, Response } from "express";
import { loggerFn } from "./middleware/loggerFn";
import { errorHandler } from "./middleware/errorHandlerFn";
import pool from "./db/db";
import { getAllUsers } from "./db/queries/userQueries";

dotenv.config();

const PORT = process.env.PORT || 3030;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/user/", userRoutes);
app.use("/api/products/", productRoutes);
app.use(loggerFn);
app.use(errorHandler);

app.get("/", (_req, res) => {
  res.status(200).json({ message: "Yello!" });
});

app.get("/all-users", async (req: Request, res: Response) => {
  const { limit } = req.query;
  try {
    const result = await getAllUsers({
      limit: limit ? Number(limit) : undefined,
    });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error querying the database");
  }
});

app.listen(PORT, () => {
  console.log(`Check http://localhost:${PORT} seu burro.`);
});

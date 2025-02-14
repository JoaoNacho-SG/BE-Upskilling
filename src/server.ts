import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import productRoutes from "./routes/products";
import shoppingCartRoutes from "./routes/shoppingCart";
import { loggerFn } from "./middleware/loggerFn";
import { errorHandler } from "./middleware/errorHandlerFn";
import { AppDataSource } from "./database/data-source";
import "reflect-metadata";
import { protectRoutesFn } from "./middleware/protectRoutesFn";

dotenv.config();

const PORT = process.env.PORT || 3030;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(loggerFn);
app.use(protectRoutesFn);
app.use("/api/", authRoutes);
app.use("/api/", userRoutes);
app.use("/api/", shoppingCartRoutes);
app.use("/api/", productRoutes);
app.use(errorHandler);

app.get("/", (_req, res) => {
  res.status(200).json({ message: "Yello!" });
});

AppDataSource.initialize()
  .then(() => {
    console.log("We're in the database, baby!");
    app.listen(PORT, () => {
      console.log(`Check http://localhost:${PORT} seu burro.`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to the database -> ", err);
  });

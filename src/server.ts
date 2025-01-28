import dotenv from "dotenv";
import express from "express";
import userRoutes from "./routes/user";
import productRoutes from "./routes/products";
dotenv.config();

const PORT = process.env.PORT || 3030;
const app = express();

app.use("/api/user/", userRoutes);
app.use("/api/products/", productRoutes);

app.get("/", (_req, res) => {
  res.send("<h1>Home</h1>");
});

app.listen(PORT, () => {
  console.log(`Check http://localhost:${PORT} seu burro.`);
});

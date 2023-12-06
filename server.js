import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoute.js";
import path from "path";
import { fileUrlToPath } from "url"

import cors from "cors";
import connectDB from "./config/db.js";
//es module fix
const __filename =fileURLToPath(import.meta.url);
const __dirname =path.dirname(__filename)

//config env
dotenv.config();
//databased config
connectDB();
//rest object
const app = express();
//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname,'./client/build')))
//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
//rest api
app.use('*',function(req,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'))
})

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`.bgCyan.white);
});

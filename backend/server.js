import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDb from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";

//App Config
const app = express();
const port = process.env.PORT || 4000;
connectDb();
connectCloudinary();

//middlewares
app.use(express.json());
app.use(cors());

//API endPoints
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("API is working...");
});

//APP start
app.listen(port, () => console.log("Server started at port:" + port));

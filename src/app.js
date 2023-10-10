import express from "express";
import cors from "cors";
import swaggerUI from "swagger-ui-express";
import swagger from "./docConfig/swagger";
import morgan from "morgan";
import allroutes from './routes/index'

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(allroutes)
app.get("/api/v1", (req, res) => {
  res.status(200).json({
    message: "Welcome to request management API",
  });
});

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swagger));


export default app;

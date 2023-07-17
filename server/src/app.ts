import express, {
  Application,
  NextFunction,
  Request,
  Response,
} from "express";
import cors from "cors";
// import globalErrorHandler from "./middleware/errorHandler";
// import router from "./routes";
// import cookieParser from 'cookie-parser';

const app: Application = express();

app.use(cors());
app.use(express.json());
// app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// // Entrance
// app.use("/api/v1", router);

// // Global Error handler
// app.use(globalErrorHandler);

app.get("/", (req, res) => {
  res.send("Server on Fire ");
});

// Handle Not found
app.use(
  (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
      success: false,
      message: "Not Found",
      errorMessages: [
        {
          path: req.originalUrl,
          message: "Api Not Found",
        },
      ],
    });
    next();
  }
);

export default app;

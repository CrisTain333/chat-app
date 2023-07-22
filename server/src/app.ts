import express, {
    Application,
    NextFunction,
    Request,
    Response
} from 'express';
import cors from 'cors';
// import globalErrorHandler from './middleware/globalErrorHandler';
import cookieParser from 'cookie-parser';
import router from './routes';
import globalErrorHandler from './middleware/globalErrorHandler';

//App
const app: Application = express();

// Cors
app.use(cors());

// Parser
app.use(express.json());
app.use(cookieParser());
app.use(
    express.urlencoded({
        extended: true
    })
);

// Entrance

// For Initial Server Test
// app.use('/', router);

// For Development
app.use('/api/v1', router);

// Global Error handler
app.use(globalErrorHandler);

// Handle Not found routes
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        success: false,
        message: 'Not Found',
        errorMessages: [
            {
                path: req.originalUrl,
                message: 'Api Not Found'
            }
        ]
    });
    next();
});

export default app;

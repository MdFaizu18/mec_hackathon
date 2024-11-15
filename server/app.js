// Importing all necessary packages 
import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import cookieParser from "cookie-parser";
import morgan from 'morgan';
import * as dotenv from "dotenv";
dotenv.config();

// Import routers and middlewares
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';


// Default export 
const app = express();
const port = 3333;

// Use express.json() instead of bodyParser.json()
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(morgan('dev'));



// Routes
app.get('/', (req, res) => {
    res.send("hello world");
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/dashboard-student/current-user", userRouter);


// Error handling routes
app.use("*", (req, res) => {
    res.status(404).json({ msg: "not found" });
});


// Listen on port and connect to MongoDB
try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, () => {
        console.log(`server running on PORT ${port}....`);
    });
} catch (error) {
    console.log(error);
    process.exit(1);
}








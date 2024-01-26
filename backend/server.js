import express from "express"
import mongoose from "mongoose"
import "dotenv/config"
import userRoutes from "./routes/user.js";
import authRoutes from "./routes/auth.js"
import path from "path"
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());

try {
    await
    mongoose.connect(process.env.MONGO_URL);
         console.log("MongDb is connected");
     
} catch (error) {
    console.error("MongoDB connection error",error);
    process.exit(1);
};
const __dirname = path.resolve();

app.use("/api/auth", authRoutes);
app.use('/api/user', userRoutes);

app.use((error,req,res,next)=>{
    const statusCode = error.statusCode || 500 ;
    const message = error.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message});
    });
    
    app.use(express.static(path.join(__dirname,"client/dist")));
    app.get("*", (req,res)=>{
        res.sendFile(path.join(__dirname, "client","dist","index.html"))
    });
    
    app.listen(3000, ()=>{
        console.log("Server is running on port 3000")
    });


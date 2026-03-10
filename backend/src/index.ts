
import express from "express"
import dotenv from "dotenv"
import router from "./routes/taskRouts.js"
import { connectDb } from "./confique/db.js"
import cors from "cors"
import { errorHandler } from "../middleware/errHandler.js"
dotenv.config()

const app=express()

app.use(express.json())
app.use(cors())
connectDb()

app.use("/api",router)
app.use(errorHandler)

app.listen(process.env.PORT,()=>{
    
   console.log( "server is running");
   
})
import express from "express"
import cors from "cors"
import 'dotenv/config'
import connectDB from "./config/db.js";


//initialize express
const app = express();

//database connection
await connectDB();


//middelwares
app.use(cors())
app.use(express.json())


//route
app.use("/",(req,res) =>{
    res.send("Api Working")
})

const PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Server listen port ${PORT}`)
})
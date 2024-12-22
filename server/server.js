import express from "express"
import cors from "cors"
import 'dotenv/config'


//initialize express
const app = express();


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
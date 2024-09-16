import express from 'express'
import userRoute from './routes/userRoute.js';
import dotenv from 'dotenv'
import dbConn from './DB/dbConn.js';
import cors from 'cors'
const app = express()
dotenv.config({ path: './.env' })
app.use(express.json());
app.use(cors());
app.listen(process.env.PORT, () => {
    console.log("server is running on http://localhost:" + process.env.PORT);
})
dbConn()
app.get('/', (req, res) => {
    res.send("Hello")
})
app.use("/api/v1",userRoute)
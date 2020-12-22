import express from 'express'
const app = express()
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import morgan from 'morgan'
import {dbconnect} from './config/db'
dotenv.config({path:'./config/config.env'})

const url = process.env.DBURL

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : true }))
app.use(cookieParser())
app.use(cors())
app.use(morgan('dev'))


import userRouter from './router/user'
app.use('/api' , userRouter)
app.listen(4000, () => {
    console.log('App listening on port 4000!');
    dbconnect(url)
});
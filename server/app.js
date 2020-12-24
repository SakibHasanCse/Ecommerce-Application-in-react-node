import express from 'express'
const app = express()
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import expressvalidator from 'express-validator'
import morgan from 'morgan'
import {dbconnect} from './config/db'
dotenv.config({path:'./config/config.env'})

const url = process.env.DBURL

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : true }))
app.use(cookieParser())
app.use(expressvalidator())
app.use(morgan('dev'))

import authRouter from './router/auth'
import userRouter from './router/user'
import categoryRouter from './router/category'
import productRouter from './router/product'

app.use('/api', authRouter)
app.use('/api', userRouter)
app.use('/api', categoryRouter)
app.use('/api', productRouter)
app.listen(4000, () => {
    console.log('App listening on port 4000!');
    dbconnect(url)
});
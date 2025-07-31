import express from 'express';
import chalk from 'chalk';
import cors from 'cors';
import dotenv from 'dotenv';
import { indexRoute } from './api/routes/index.js';
import { createConnection } from './utils/db/connection.js'; 
const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();    
app.use('/api', indexRoute);
const promise = createConnection();
promise.then(() =>{
    console.log(chalk.green('Database connected successfully'));
    const server=app.listen(7778,(err)=>{
    if(err) {
        console.error(chalk.red('Error starting server:', err));
    } else {
        console.log(chalk.green('Server is running...'), server.address().port);
    }   
})
}).catch((err) => {
    console.error(chalk.red('Database connection failed:', err));
})
import { calculatorRouter } from '@routers/calculatorRouter';
import express from 'express';
import { Request, Response } from 'express';

const app = express();

const PORT = process.env.PORT || 8080

app.use('/api/calculator', calculatorRouter)

app.listen(PORT, () => {
    console.log(`Server working at port ${PORT}`)
})
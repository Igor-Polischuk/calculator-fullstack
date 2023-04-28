import express from 'express';
import cors from 'cors'

import { calculatorRouter } from '@routers/calculatorRouter';

const app = express();

const PORT = process.env.PORT || 8080

app.use(cors())
app.use('/api/calculator', calculatorRouter)

app.listen(PORT, () => {
    console.log(`Server working at port ${PORT}`)
})
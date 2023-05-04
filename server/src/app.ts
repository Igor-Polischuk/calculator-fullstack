import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';

import { calculatorRouter } from '@modules/calculator/routers/calculatorRouter';

const app = express();

const PORT = process.env.PORT || 8080

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api/calculator', calculatorRouter)


app.listen(PORT, () => {
    console.log(`Server working at port ${PORT}`)
})
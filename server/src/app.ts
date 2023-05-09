import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';

import { initCalculatorModule } from '@modules/calculator';

const app = express();

const PORT = process.env.PORT || 8080

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/api/calculator', initCalculatorModule())


app.listen(PORT, () => {
    console.log(`Server working at port ${PORT}`)
})
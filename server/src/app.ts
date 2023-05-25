import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';

import { errorHandler } from 'middlewares/errorHandlerMiddleware';
import { appModule } from '@modules/index';

const app = express();

const PORT = process.env.PORT || 8080

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(appModule)

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server working at port ${PORT}`)
})
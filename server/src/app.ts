import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';

import { errorHandler } from 'middlewares/errorHandlerMiddleware';
import { AppModule } from '@modules/AppModule';

const app = express();

const PORT = process.env.PORT || 8080

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(AppModule.init('/api'))

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server working at port ${PORT}`)
})
import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import expressWinston from 'express-winston'

import { errorHandler } from 'middlewares/errorHandlerMiddleware';
import { appModule } from '@modules/index';
import { logger } from 'common/logger';

const app = express();

const PORT = process.env.PORT || 8080

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressWinston.logger({
    winstonInstance: logger,
    statusLevels: true
}))

app.use(appModule)
app.get('/error', () => {
    throw new Error('Blyaaaa')
})

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server working at port ${PORT}`)
})
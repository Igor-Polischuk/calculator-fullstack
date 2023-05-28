import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import expressWinston from 'express-winston'

import { errorHandler } from 'middlewares/errorHandlerMiddleware';
import { appModule } from '@modules/index';
import { appLogger, errorLogger } from 'common/loggers';

const app = express();

const PORT = process.env.PORT || 8080

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressWinston.logger({
    winstonInstance: appLogger,
    statusLevels: true
}))

app.use(appModule)

app.use(errorLogger)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server working at port ${PORT}`)
})
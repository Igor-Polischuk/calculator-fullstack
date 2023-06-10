import { Router } from "express";
import { clientLogController } from "../controllers/client-log-controller";

const commonRouter = Router()

commonRouter.post('/log', clientLogController.validateClientLogRequest, clientLogController.saveLog)

export { commonRouter }
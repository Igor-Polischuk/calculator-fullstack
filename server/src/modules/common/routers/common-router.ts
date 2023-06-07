import { Router } from "express";
import { ClientLogController } from "../controllers/client-log-controller";

const commonRouter = Router()

commonRouter.post('/log', ClientLogController.validateClientLogRequest, ClientLogController.saveLog)

export { commonRouter }
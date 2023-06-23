import { Router } from "express";
import { calculatorModule } from "./calculator";
import { IModule } from "@modules/common/interfaces/IModules";
import { commonModule } from "./common";
import { historyModule } from "./history";

const modules: IModule[] = [calculatorModule, commonModule, historyModule]

const appRouter = Router()

modules.forEach(module => {
    appRouter.use(`/api`, module.router)
})

export { appRouter }

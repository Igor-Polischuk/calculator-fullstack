import { Router } from "express";
import { calculatorModule } from "./calculator";
import { IModule } from "@modules/common/interfaces/IModules";
import { commonModule } from "./common";

const modules: IModule[] = [calculatorModule, commonModule]

export function initModules(baseUrl = '') {
    const appRouter = Router()

    modules.forEach(module => {
        appRouter.use(`${baseUrl}`, module.router)
    })

    return appRouter
}

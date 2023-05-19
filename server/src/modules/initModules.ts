import { Router } from "express";
import { calculatorModule } from "./calculator";
import { IModule } from "interfaces/IModules";

const modules: IModule[] = [calculatorModule]

export function initModules(baseUrl = '') {
    const appRouter = Router()

    modules.forEach(module => {
        appRouter.use(`${baseUrl}`, module.router)
    })

    return appRouter
}
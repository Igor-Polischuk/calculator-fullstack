import { Router } from "express";
import { calculatorModule } from "./calculator";
import { IModule } from "interfaces/IModules";

const modules: IModule[] = [calculatorModule]

export class AppModule {
    static init(baseUrl = '/') {
        const appRouter = Router()

        modules.forEach(module => {
            appRouter.use(`${baseUrl}${module.modulePath}`, module.router)
        })

        return appRouter
    }
}
import { IModule } from "interfaces/IModules";
import { calculatorRouter } from "./routers/calculatorRouter";

class CalculatorModule implements IModule {
    readonly router = calculatorRouter
    readonly modulePath = '/calculator'
}

export const calculatorModule = new CalculatorModule()
import { IModule } from "@modules/common/interfaces/IModules";
import { calculatorRouter } from "./routers/calculatorRouter";

export const calculatorModule: IModule = {
    router: calculatorRouter,
}

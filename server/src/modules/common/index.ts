import { IModule } from "@modules/common/interfaces/IModules";
import { commonRouter } from "./routers/common-router";

export const commonModule: IModule = {
    router: commonRouter,
}

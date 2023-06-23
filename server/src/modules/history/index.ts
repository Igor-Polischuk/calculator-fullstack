import { IModule } from "@modules/common/interfaces/IModules";
import { historyRouter } from "./routers/history-router";

export const historyModule: IModule = {
    router: historyRouter,
}

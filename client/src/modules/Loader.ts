import { DivElement } from "./Elements/DivElement";
import { Span } from "./Elements/Span";

interface ILoaderParams {
    fullscreen?: boolean
    fillElement?: boolean
    transparentBG?: boolean
}

interface IAddLoaderByLoadingParams {
    loading: boolean
    component: DivElement
    loadingOptions: ILoaderParams
}

export class Loader extends DivElement {
    private loader: Span

    constructor(params?: ILoaderParams) {

        const classList = ['loader-wrapper'];
        const classNames: Record<string, string> = {
            fullscreen: 'fullscreen',
            fillElement: 'fill-element',
            transparentBG: 'transparent-bg'
        };

        for (const [key, value] of Object.entries(params || {})) {
            if (value && classNames[key]) {
                classList.push(classNames[key]);
            }
        }

        super({ classNames: classList.join(' '), id: 'loader' })
        this.loader = new Span({ classNames: `loader` })

        this.append(this.loader)
    }

    static addLoaderByLoading(params: IAddLoaderByLoadingParams): void {
        if (params.loading) {
            params.component.append(new Loader(params.loadingOptions))
        } else {
            params.component.removeElement('#loader')
        }
    }
}

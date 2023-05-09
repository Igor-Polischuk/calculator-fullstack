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
        const fullscreenClass = params?.fullscreen ? 'fullscreen' : ''
        const fillElementClass = params?.fillElement ? 'fill-element' : ''
        const transparentBG = params?.transparentBG ? 'transparent-bg' : ''

        super({ classNames: `loader-wrapper ${fullscreenClass} ${fillElementClass} ${transparentBG}`, id: 'loader' })
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

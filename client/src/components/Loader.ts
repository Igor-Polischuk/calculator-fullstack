import { DivElement } from "./Elements/DivElement";
import { Span } from "./Elements/Span";

interface ILoaderParams {
    fullscreen: boolean
}

export function getLoader(params?: ILoaderParams): DivElement {
    const fullscreen = params?.fullscreen ? 'fullscreen' : ''

    const loader = new Span({
        classNames: `loader-text`,
        text: 'L &nbsp; ading'
    })

    const loaderWrapper = new DivElement({ classNames: `loader-wrapper ${fullscreen}`, id: 'loader' })
    loaderWrapper.append(loader)

    return loaderWrapper
}

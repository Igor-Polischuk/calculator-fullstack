import { DivElement } from "./Elements/DivElement";
import { Span } from "./Elements/Span";

interface ILoaderParams {
    fullscreen?: boolean
    type?: 'text' | 'circle'
}

export function getLoader(params?: ILoaderParams): DivElement {
    const fullscreen = params?.fullscreen ? 'fullscreen' : ''
    const loaderType = params?.type === 'text' ? 'loader-text' : 'loader-circle'

    const loader = new Span({
        classNames: `${loaderType}`,
        text: params?.type === 'text' ? 'L &nbsp; ading' : ''
    })

    const loaderWrapper = new DivElement({ classNames: `loader-wrapper ${fullscreen}`, id: 'loader' })
    loaderWrapper.append(loader)

    return loaderWrapper
}

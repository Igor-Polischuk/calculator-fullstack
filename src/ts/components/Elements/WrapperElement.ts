import { DivElement } from "./DivElement"

interface IWrapperElementParams {
    wrapperClassNames?: string
    wrapperId?: string
}

export class WrapperElement {
    protected wrapper: DivElement
    constructor(params: IWrapperElementParams) {
        this.wrapper = new DivElement({
            classNames: params.wrapperClassNames,
            id: params.wrapperId
        })
    }

    get element() {
        return this.wrapper
    }
}
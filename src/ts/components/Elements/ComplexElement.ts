import { DivElement } from "./DivElement"

interface IComplexElementParams {
    wrapperClassNames?: string
    wrapperId?: string
}

export class WrapperElement {
    protected wrapper: DivElement
    constructor(params: IComplexElementParams) {
        this.wrapper = new DivElement({
            classNames: params.wrapperClassNames,
            id: params.wrapperId
        })
    }

    get element() {
        return this.wrapper
    }
}
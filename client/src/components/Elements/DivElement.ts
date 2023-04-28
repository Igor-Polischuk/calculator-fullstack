import { BaseElement } from "./BaseElement"
import { IDivElement, IBaseElement, IBaseElementParams } from "./interfaces"

export class DivElement extends BaseElement implements IDivElement {
    private div: HTMLDivElement

    constructor(params: IBaseElementParams) {
        super(params)
        this.div = document.createElement('div')
    }

    get domElement(): HTMLDivElement {
        return this.div
    }

    removeElement(selector: string): void {
        const element = this.div.querySelector(selector)
        if (element) {
            element.remove()
        }
    }
}

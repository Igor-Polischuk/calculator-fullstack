import { BaseElement } from "./BaseElement"
import { IDivElement, IBaseElement, IBaseElementParams } from "./interfaces"

export class Image extends BaseElement {
    private img: HTMLImageElement

    constructor(params: IBaseElementParams & { src: string }) {
        super(params)
        this.img = document.createElement('img')
        this.img.src = params?.src

    }

    get domElement(): HTMLDivElement {
        return this.img
    }

    set src(url: string) {
        this.img.src = url
    }
}

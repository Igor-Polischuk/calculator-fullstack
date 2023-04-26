import { BaseElement } from './BaseElement';
import { IBaseElementParams } from './interfaces';

interface ISpanParams extends IBaseElementParams {
    text?: string
}

export class Span extends BaseElement {
    private spanElement: HTMLSpanElement
    constructor(params: ISpanParams) {
        super(params)
        this.spanElement = document.createElement('span')
        this.spanElement.innerHTML = params.text || ''
    }

    get domElement(): HTMLSpanElement {
        return this.spanElement
    }

    set text(text: string) {
        this.spanElement.innerHTML = text
    }
}
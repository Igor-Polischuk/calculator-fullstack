import { BaseElement } from './BaseElement';
import { IBaseElementParams } from './interfaces';

interface IParagraphParams extends IBaseElementParams{
    text?: string
}

export class Span extends BaseElement {
    private spanElement: HTMLSpanElement
    constructor(params: IParagraphParams){
        super(params)
        this.spanElement = document.createElement('span')
        this.spanElement.innerText = params.text ?? ''
    }

    get domElement(){
        return this.spanElement
    }

    set text(text: string){
        this.spanElement.innerHTML = text
    }

    get spanString(){
        return `<span>${this.spanElement.innerText}</span>`
    }
}
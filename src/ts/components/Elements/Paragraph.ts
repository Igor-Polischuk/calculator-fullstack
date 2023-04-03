import { BaseElement } from './BaseElement';
import { IBaseElementParams } from './interfaces';

interface IParagraphParams extends IBaseElementParams{
    text: string
}

export class Paragraph extends BaseElement {
    private paragraphElement: HTMLParagraphElement
    constructor(params: IParagraphParams){
        super(params)
        this.paragraphElement = document.createElement('p')
        this.paragraphElement.innerHTML = params.text
    }

    get domElement(){
        return this.paragraphElement
    }

    set HTML(text: string){
        this.paragraphElement.innerHTML = text
    }
}
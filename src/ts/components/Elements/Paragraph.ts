import { BaseElement } from './BaseElement';
import { IBaseElementConfig } from './interfaces';

interface IParagraphConfig extends IBaseElementConfig{
    text: string
}

export class Paragraph extends BaseElement {
    private paragraphElement: HTMLParagraphElement
    constructor(config: IParagraphConfig){
        super(config)
        this.paragraphElement = document.createElement('p')
        this.paragraphElement.innerHTML = config.text
    }

    get domElement(){
        return this.paragraphElement
    }

    set text(text: string){
        this.paragraphElement.innerHTML = text
    }
}
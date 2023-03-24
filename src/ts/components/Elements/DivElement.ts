import { BaseElement } from "./BaseElement"
import { IDivElement, IBaseElement, IBaseElementConfig } from "./interfaces"

export class DivElement extends BaseElement implements IDivElement{
    private div: HTMLDivElement
    protected children: IBaseElement[] = []

    constructor(config: IBaseElementConfig){
        super(config)
        this.div = document.createElement('div')
    }

    get domElement(){
        return this.div
    }

    append(...elements: IBaseElement[]){
        elements.forEach(element => {
            element.render(this.div)
            this.children = [...this.children, element]
        })
    }

}

import { MyElement } from "./Element"
import { IBlockElement, IMyElement, IMyElementConfig } from "./interfaces"

export class BlockElement extends MyElement implements IBlockElement{
    private block: HTMLDivElement
    protected children: IMyElement[] = []

    constructor(config: IMyElementConfig){
        super(config)
        this.block = document.createElement('div')
    }

    get domEl(){
        return this.block
    }

    append(...elements: IMyElement[]){
        elements.forEach(element => {
            element.insert(this.block)
            this.children = [...this.children, element]
        })
    }

}

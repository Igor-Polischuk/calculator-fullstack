import { BaseElement } from "./BaseElement"
import { IDivElement, IBaseElement, IBaseElementParams } from "./interfaces"

export class UnorderedList extends BaseElement{
    private ul: HTMLUListElement
    protected children: IBaseElement[] = []

    constructor(params: IBaseElementParams){
        super(params)
        this.ul = document.createElement('ul')
    }

    get domElement(){
        return this.ul
    }
}

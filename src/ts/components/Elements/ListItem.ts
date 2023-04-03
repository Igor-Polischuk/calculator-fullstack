import { BaseElement } from "./BaseElement"
import { IDivElement, IBaseElement, IBaseElementParams } from "./interfaces"

export class ListItem extends BaseElement{
    private li: HTMLLIElement
    protected children: IBaseElement[] = []

    constructor(params: IBaseElementParams){
        super(params)
        this.li = document.createElement('li')
    }

    get domElement(){
        return this.li
    }
}

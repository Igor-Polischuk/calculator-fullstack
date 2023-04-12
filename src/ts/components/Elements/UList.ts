import { BaseElement } from "./BaseElement"
import { IBaseElement, IBaseElementParams } from "./interfaces"


export class UnorderedList extends BaseElement {
    private ul: HTMLUListElement

    constructor(params: IBaseElementParams) {
        super(params)
        this.ul = document.createElement('ul')
    }

    get domElement() {
        return this.ul
    }

    appendListItems(children: BaseElement[]) {
        children.forEach(child => {
            const listItem = document.createElement('li')
            child.render(listItem)
            this.ul.appendChild(listItem)
        })
    }
}

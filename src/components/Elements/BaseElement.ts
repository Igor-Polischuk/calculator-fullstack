import { IBaseElement, IBaseElementParams } from "./interfaces";

export class BaseElement implements IBaseElement {
    protected classNames: string;
    protected id: string;
    protected parentNode: Element | null = null
    protected children: IBaseElement[] = []

    constructor(params?: IBaseElementParams) {
        this.classNames = params?.classNames || ''
        this.id = params?.id || ''
    }

    render(parentNode: Element): void {
        const el = this.domElement
        el.className = this.classNames
        el.id = this.id
        this.parentNode = parentNode
        this.parentNode.appendChild(el)
    }

    get domElement(): Element {
        throw new Error('domEl getter not implemented')
    }

    get childElements(): IBaseElement[] {
        return this.children
    }

    append(...elements: IBaseElement[]): void {
        elements.forEach(element => {
            element.render(this.domElement)
            this.children = [...this.children, element]
        })
    }

    onClick(callback: (e: Event) => void): void {
        this.domElement.addEventListener('click', (e) => callback(e))
    }
}
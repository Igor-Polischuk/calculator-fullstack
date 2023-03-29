import { IBaseElement, IBaseElementParams } from "./interfaces";

export class BaseElement implements IBaseElement{
    protected classNames: string;
    protected parentNode: Element | null = null
    constructor(params: IBaseElementParams) {
        this.classNames = params.classNames || '';
    }

    render(parentNode: Element) {
        const el = this.domElement;
        el.className = this.classNames
        this.parentNode = parentNode
        this.parentNode.appendChild(el);
    }

    get domElement(): Element {
        throw new Error('domEl getter not implemented');
    }
}
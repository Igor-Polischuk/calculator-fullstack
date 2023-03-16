import { IMyElement, IMyElementConfig } from "./interfaces";



export class MyElement implements IMyElement{
    protected classNames: string[];
    protected parentNode: Element | null = null
    constructor(config: IMyElementConfig) {
        this.classNames = config.classNames || [];
    }

    insert(parentNode: Element) {
        const el = this.domEl;
        el.classList.add(...this.classNames);
        this.parentNode = parentNode
        this.parentNode.appendChild(el);
    }

    get domEl(): Element {
        throw new Error('domEl getter not implemented');
    }
}
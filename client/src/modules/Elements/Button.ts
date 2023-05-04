import { BaseElement } from "./BaseElement";
import { IButton } from "./interfaces";

interface IButtonParams {
    text: string,
    classNames: string,
    type: string
    value?: string,
}

export class Button extends BaseElement implements IButton {
    public type: string
    private text: string
    readonly value?: string
    private button: HTMLButtonElement
    constructor(params: IButtonParams) {
        super(params)
        this.text = params.text
        this.type = params.type
        this.value = params.value
        this.button = document.createElement('button')
        this.button.innerHTML = this.text
    }

    get domElement(): HTMLButtonElement {
        return this.button
    }
}
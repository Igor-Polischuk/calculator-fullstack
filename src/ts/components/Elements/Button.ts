import { BaseElement } from "./BaseElement";
import { IButton } from "./interfaces";

interface IButtonConfig {
    text: string,
    classNames: string,
    data?: Record<string, string>,
    role?: string
}

export class Button extends BaseElement implements IButton{
    private text: string;
    private data?: Record<string, string> = {}
    private button: HTMLButtonElement
    private role?: string
    constructor(config: IButtonConfig) {
        super(config)
        this.text = config.text
        this.role = config.role
        this.data = config.data
        this.button = document.createElement('button')
        this.button.innerHTML= this.text
    }

    onClick(callback: (e: MouseEvent) => void) {
        this.button.addEventListener('click', (e) => callback(e))
    }

    get domElement(){
        return this.button
    }

    get getButtonRole(){
        return this.role
    }

    get metaData(){
        return this.data || {}
    }
}
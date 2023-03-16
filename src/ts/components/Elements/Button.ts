import { MyElement } from "./Element";
import { IButton } from "./interfaces";

interface IButtonConfig {
    text: string,
    classNames: string[],
    meta?: Record<string, string>,
}

export class Button extends MyElement implements IButton{
    private text: string;
    private meta: Record<string, string> = {}
    private button: HTMLButtonElement

    constructor(config: IButtonConfig) {
        super(config)
        this.text = config.text
        this.meta = config.meta ? {...config.meta} : {text: this.text}
        this.button = document.createElement('button')
        this.button.innerHTML= this.text
    }

    onClick(callback: (e: MouseEvent) => void) {
        this.button.addEventListener('click', (e) => callback(e))
    }

    get domEl(){
        return this.button
    }

    get metaData(){
        return this.meta
    }
}
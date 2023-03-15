interface IButtonConfig {
    text: string,
    classNames: string[],
    parentNode: Element
    meta?: Record<string, string>,
}

export class Button {
    private text: string;
    private meta: Record<string, string> = {}
    private classNames: string[]
    private parentNode: Element
    private button: HTMLButtonElement

    constructor(config: IButtonConfig) {
        this.text = config.text
        this.meta = config.meta ? {...config.meta} : {text: this.text}
        this.classNames = config.classNames
        this.parentNode = config.parentNode

        this.button = document.createElement('button')
        this.button.classList.add(...this.classNames)
        this.button.innerText = this.text
        this.parentNode.appendChild(this.button)
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
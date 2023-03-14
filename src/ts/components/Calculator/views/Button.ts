export class Button{
    private content: string;
    private value: string
    private classNames: string[]
    private parrentNode: Element
    private button: HTMLButtonElement

    constructor(config: {
        content: string,
        value?: string,
        classNames: string[],
        parrentNode: Element
    }){
        this.content = config.content
        this.value = config.value || this.content
        this.classNames = config.classNames
        this.parrentNode = config.parrentNode

        this.button = document.createElement('button')
        this.button.classList.add(...this.classNames)
        this.button.innerHTML = this.content
        this.parrentNode.appendChild(this.button)
    }

    onClick(callback: (e: MouseEvent) => void){
        this.button.addEventListener('click', (e) => callback(e))
    }

    getButtonInfo(){
        return {
            value: this.value,
            domElement: this.button,
            content: this.content
        }
    }
}
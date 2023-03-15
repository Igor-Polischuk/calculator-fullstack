interface IInputConfig {
    classNames: string[],
    parentNode: Element,
    value?: string,
    placeholder?: string
    type?: string
    clearBtn?: boolean
}

export class Input {
    private parrentNode: Element
    private input: HTMLInputElement
    private classNames: string[]

    constructor({classNames, parentNode, value = '', placeholder = '', clearBtn = true, type = 'text'}: IInputConfig ) {
        this.classNames = classNames
        this.parrentNode = parentNode

        this.input = document.createElement('input')
        this.input.placeholder = placeholder
        this.input.type = type
        this.input.classList.add(...this.classNames)
        this.parrentNode.appendChild(this.input)
        this.input.value = value 

        clearBtn && this.addClearBtn()
    }

    set value(newValue: string) {
        this.input.value = newValue
        this.imitateInput()
    }

    get value() {
        return this.input.value
    }

    get domEl(){
        return this.input
    }

    onInput(callback: (e: Event) => void) {
        this.input.addEventListener('input', callback)
    }

    private addClearBtn() {
        const standartClasses = ['calculator__input-clear']
        const btn = document.createElement('span')
        btn.innerHTML = '×'
        btn.classList.add(...standartClasses)
        this.parrentNode.appendChild(btn)
        this.onInput(() => {
            btn.style.display = this.value.length > 0 ? 'flex' : 'none'
        })
        btn.addEventListener('click', () => this.value = '')
    }

    private imitateInput() {
        const event = new Event('input', { bubbles: true });
        this.input.dispatchEvent(event);
    };

}
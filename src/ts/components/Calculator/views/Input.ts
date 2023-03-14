export class Input {
    private parrentNode: Element
    private input: HTMLInputElement
    private classNames: string[]

    constructor(config: {
        classNames: string[],
        parrentNode: Element,
        value?: string,
        placeholder?: string
        type?: string
    }) {
        this.classNames = config.classNames
        this.parrentNode = config.parrentNode

        this.input = document.createElement('input')
        this.input.placeholder = config.placeholder || ''
        this.input.type = config.type || 'text'
        this.input.classList.add(...this.classNames)
        this.parrentNode.appendChild(this.input)
        this.input.value = config.value || ''

        this.addClearBtn()
    }

    set value(newValue: string) {
        this.input.value = newValue
        this.imitateInput()
    }

    get value() {
        return this.input.value
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
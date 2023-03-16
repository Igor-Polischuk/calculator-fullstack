import { IInput } from './interfaces';
import { MyElement } from './Element';
interface IInputConfig {
    classNames: string[],
    value?: string,
    placeholder?: string
    type?: string
    clearBtn?: boolean
}

export class Input extends MyElement implements IInput {
    private input: HTMLInputElement

    constructor({ classNames, value = '', placeholder = '', clearBtn = true, type = 'text' }: IInputConfig) {
        super({ classNames })
        this.classNames = classNames

        this.input = document.createElement('input')
        this.input.placeholder = placeholder
        this.input.type = type
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

    get domEl() {
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
        this.parentNode?.appendChild(btn)
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
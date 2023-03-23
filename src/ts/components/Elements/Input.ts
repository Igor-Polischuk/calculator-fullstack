import { IInput } from './interfaces';
import { MyElement } from './Element';
interface IInputConfig {
    classNames: string[],
    value?: string,
    placeholder?: string
    type?: string
}

export class Input extends MyElement implements IInput {
    private input: HTMLInputElement

    constructor({ classNames, value = '', placeholder = '', type = 'text' }: IInputConfig) {
        super({ classNames })
        this.classNames = classNames

        this.input = document.createElement('input')
        this.input.placeholder = placeholder
        this.input.type = type
        this.input.value = value
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

    private imitateInput() {
        const event = new Event('input', { bubbles: true });
        this.input.dispatchEvent(event);
    };

}
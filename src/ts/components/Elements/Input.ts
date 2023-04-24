import { IInput } from './interfaces';
import { BaseElement } from './BaseElement';
interface IInputParams {
    classNames: string,
    value?: string,
    placeholder?: string
    type?: string
}

export class Input extends BaseElement implements IInput {
    private input: HTMLInputElement

    constructor({ classNames, value = '', placeholder = '', type = 'text' }: IInputParams) {
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

    get value(): string {
        return this.input.value
    }

    get domElement(): HTMLInputElement {
        return this.input
    }

    onInput(callback: (e: Event) => void): void {
        this.input.addEventListener('input', callback)
    }

    private imitateInput(): void {
        const event = new Event('input', { bubbles: true });
        this.input.dispatchEvent(event);
    };

}
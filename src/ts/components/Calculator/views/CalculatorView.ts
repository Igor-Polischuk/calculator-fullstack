import { IError } from './../types/ICalculator';
import { ICalculatorModel, ICalculatorView } from "@components/Calculator/types/ICalculator";
import { CalculatorObserverEvent } from "../calculator-event";

export class CalculatorView implements ICalculatorView {
    private mathInput: HTMLInputElement | null = null;
    private resultEl: HTMLDivElement | null = null;

    constructor(public model: ICalculatorModel,
        private wasNewResult = false) {
        this.init()
    }

    private init() {
        this.mathInput = document.querySelector<HTMLInputElement>('#math-input');
        this.resultEl = document.querySelector<HTMLDivElement>('#result-output');
        this.listenBtns()
        this.model.subscribe(CalculatorObserverEvent.Result, (result) => {
            this.renderResult(result)
        })
        this.model.subscribe(CalculatorObserverEvent.Error, (errors) => {
            this.renderErrors(errors)
        })
        const clearInput = document.querySelector<HTMLSpanElement>('.calculator__input-clear')
        this.mathInput?.addEventListener('input', () => {
            if (!(this.mathInput && clearInput)) return
            this.mathInput.value.length === 0 ? clearInput.style.display = '' : clearInput.style.display = 'flex'
        })

        clearInput?.addEventListener('click', () => this.updateInputValue(''))

    }

    private renderResult(newResult: number) {
        if (!(this.mathInput && this.resultEl)) return
        this.mathInput.classList.remove('error')
        this.wasNewResult = true
        this.resultEl.classList.add('visible')
        const expression = this.formatExpression(this.mathInput.value)
        this.resultEl.innerHTML = `${expression} = <b>${newResult}</b>`
        this.mathInput.value = newResult.toString()
    }

    private renderErrors(errors: IError[]) {
        if (!(this.mathInput && this.resultEl)) return
        console.log(errors);
        let errorString = ''
        const errorsIndex = errors.map(err => err.where)
        this.mathInput?.value.split('').forEach((char, i) => {
            if (errorsIndex.includes(i)) {
                errorString += `<span class='error'>${char}</span>`
            } else {
                errorString += char
            }
        })
        this.mathInput.classList.add('error')
        this.resultEl.classList.add('visible')
        this.resultEl.innerHTML = errorString
    }

    private listenBtns() {
        const numberBtns = document.querySelectorAll<HTMLButtonElement>('[data-btn-num]')
        const actionBtns = document.querySelectorAll<HTMLButtonElement>('[data-btn-action]')
        const resultBtn = document.querySelector('#result-btn')
        const removeBtn = document.querySelector('#remove-symbol-btn')

        numberBtns.forEach(button => {
            button.addEventListener('click', () => {
                if (this.mathInput) {
                    if (this.wasNewResult) {
                        this.updateInputValue(button.innerText)
                        this.wasNewResult = false
                    } else {
                        const newValue = this.mathInput.value + button.innerText
                        this.updateInputValue(newValue)
                    }

                }
            })
        })
        actionBtns.forEach(button => {
            button.addEventListener('click', () => {
                if (!this.mathInput) return
                const newValue = this.mathInput.value + button.dataset.btnAction
                this.updateInputValue(newValue)
                this.wasNewResult = false
            })
        })
        removeBtn?.addEventListener('click', () => {
            if (!this.mathInput) return
            const lastSymbolIndex = this.mathInput.value.length - 1
            const newValue = this.mathInput.value.slice(0, lastSymbolIndex)
            this.updateInputValue(newValue)
        })
        resultBtn?.addEventListener('click', () => {
            if (this.mathInput) {
                this.model.setExpression(this.mathInput.value)
            }
        })
    }

    private updateInputValue(newValue: string) {
        if (!this.mathInput) return
        this.mathInput.value = newValue;
        const event = new Event('input', { bubbles: true });
        this.mathInput.dispatchEvent(event);
    };

    private formatExpression(expression: string) {
        return expression
            .replace(/\*/g, '×')
            .replace(/\//g, '÷')
    }
}

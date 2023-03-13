import { IError } from './../types/ICalculator';
import { ICalculatorModel, ICalculatorView } from "@components/Calculator/types/ICalculator";
import { CalculatorObserverEvent } from "../calculator-event";

export class CalculatorView implements ICalculatorView {
    private mathInput: HTMLInputElement | null = null;
    private resultEl: HTMLDivElement | null = null;
    private expression = ''

    constructor(public model: ICalculatorModel,
        private wasNewResult = false) {
        this.init()
    }

    private init() {
        this.resultEl = document.querySelector<HTMLDivElement>('#result-output');
        this.listenBtns()
        this.listenInput()
        this.model.subscribe(CalculatorObserverEvent.Result, (result) => {
            this.renderResult(result)
        })
        this.model.subscribe(CalculatorObserverEvent.Error, (errors) => {
            this.renderErrors(errors)
        })
    }

    private listenInput() {
        this.mathInput = document.querySelector<HTMLInputElement>('#math-input');

        const clearInput = document.querySelector<HTMLSpanElement>('.calculator__input-clear')
        this.mathInput?.addEventListener('input', () => {
            if (!(this.mathInput && clearInput)) return
            this.expression = this.mathInput.value
            this.expression.length === 0 ? clearInput.style.display = '' : clearInput.style.display = 'flex'
        })

        clearInput?.addEventListener('click', () => {
            this.updateInputValue('')
            // this.hideResult()
        })
    }
    // private hideResult() {
    //     if(!this.resultEl) return
    //     this.resultEl.classList.remove('visible')
    //     this.resultEl.innerHTML = ''
    // }

    private renderResult(newResult: number) {
        if (!(this.mathInput && this.resultEl)) return
        this.mathInput.classList.remove('error')
        this.wasNewResult = true
        this.resultEl.classList.add('visible')
        const expression = this.formatExpression(this.expression)

        this.resultEl.innerHTML = `${expression} = <b>${newResult}</b>`
        this.updateInputValue(newResult.toString())
    }

    private renderErrors(errors: IError[]) {
        if (!(this.mathInput && this.resultEl)) return
        const errorsIndex = errors.map(err => err.where)
        const expressionArr = this.expression.split('')
        const errorInfo = expressionArr.reduce<string>((errorAcc, char, i) => {
            return errorAcc += errorsIndex.includes(i) ? `<span class='error'>${char}</span>` : char
        }, '')

        this.mathInput.classList.add('error')
        this.resultEl.classList.add('visible')
        this.resultEl.innerHTML = errorInfo
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
                        const newValue = this.expression + button.innerText
                        this.updateInputValue(newValue)
                    }

                }
            })
        })
        actionBtns.forEach(button => {
            button.addEventListener('click', () => {
                const newValue = this.expression + button.dataset.btnAction
                this.updateInputValue(newValue)
                this.wasNewResult = false
            })
        })
        removeBtn?.addEventListener('click', () => {
            if (!this.mathInput) return
            const lastSymbolIndex = this.expression.length - 1
            const newValue = this.mathInput.value.slice(0, lastSymbolIndex)
            this.updateInputValue(newValue)
            this.wasNewResult = false
        })
        resultBtn?.addEventListener('click', () => {
            this.model.setExpression(this.expression)

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

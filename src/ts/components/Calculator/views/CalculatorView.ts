import { IError } from './../types/ICalculator';
import { ICalculatorModel, ICalculatorView } from "@components/Calculator/types/ICalculator";
import { CalculatorObserverEvent } from "../calculator-event";
import { Button } from './Button';
import { Input } from './Input';

export class CalculatorView implements ICalculatorView {
    private mathInput: Input = new Input({
        parrentNode: document.querySelector('.calculator__field')!,
        classNames: ['calculator__input'],
        placeholder: 'Enter what you want to calculate'
    });
    private resultEl: HTMLDivElement | null = null;
    private expression = ''

    constructor(public model: ICalculatorModel,
        private wasNewResult = false) {
        this.init()
    }

    private init() {
        this.resultEl = document.querySelector<HTMLDivElement>('#result-output');
        this.listenBtns()
        // this.listenInput()
        this.initNumbersBtn()
        this.model.subscribe(CalculatorObserverEvent.Result, (result) => {
            // this.renderResult(result)
        })
        this.model.subscribe(CalculatorObserverEvent.Error, (errors) => {
            this.renderErrors(errors)
        })
    }

    // private listenInput() {
    //     this.mathInput = document.querySelector<HTMLInputElement>('#math-input');

    //     const clearInput = document.querySelector<HTMLSpanElement>('.calculator__input-clear')
    //     // this.mathInput?.addEventListener('input', () => {
    //     //     if (!(this.mathInput && clearInput)) return
    //     //     this.expression = this.mathInput.value
    //     //     this.expression.length === 0 ? clearInput.style.display = '' : clearInput.style.display = 'flex'
    //     // })

    //     clearInput?.addEventListener('click', () => {
    //         this.updateInputValue('')
    //     })
    // }

    // private renderResult(newResult: number) {
    //     if (!(this.mathInput && this.resultEl)) return
    //     this.mathInput.classList.remove('error')
    //     this.wasNewResult = true
    //     this.resultEl.classList.add('visible')
    //     const expression = this.formatExpression(this.expression)

    //     this.resultEl.innerHTML = `${expression} = <b>${newResult}</b>`
    //     this.updateInputValue(newResult.toString())
    // }

    private renderErrors(errors: IError[]) {
        if (!(this.mathInput && this.resultEl)) return
        const errorsIndex = errors.map(err => err.where)
        const expressionArr = this.expression.split('')
        const errorInfo = expressionArr.reduce<string>((errorAcc, char, i) => {
            return errorAcc += errorsIndex.includes(i) ? `<span class='error'>${char}</span>` : char
        }, '')

        // this.mathInput.classList.add('error')
        this.resultEl.classList.add('visible')
        this.resultEl.innerHTML = errorInfo
    }

    private initNumbersBtn() {
        const parentNode = document.querySelector('.calculator__buttons__number')!
        const numbersValues = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.']
        const classNames = ['button', 'button--number']
        const zeroBtnClassName = [...classNames, 'zero']
        numbersValues.forEach(number => {
            const button = new Button({
                content: number,
                classNames: number === '0' ? zeroBtnClassName : classNames,
                parrentNode: parentNode
            })

            button.onClick(() => {
                if (this.wasNewResult) {
                    this.mathInput.value = number
                    this.wasNewResult = false
                } else {
                    const newValue = this.mathInput.value + number
                    this.mathInput.value = newValue
                }
            })
        })
    }

    private listenBtns() {
        const actionBtns = document.querySelectorAll<HTMLButtonElement>('[data-btn-action]')
        const resultBtn = document.querySelector('#result-btn')
        const removeBtn = document.querySelector('#remove-symbol-btn')

        actionBtns.forEach(button => {
            button.addEventListener('click', () => {
                const newValue = this.mathInput.value + button.dataset.btnAction
                this.mathInput.value = newValue
                this.wasNewResult = false
            })
        })
        removeBtn?.addEventListener('click', () => {
            if (!this.mathInput) return
            const lastSymbolIndex = this.mathInput.value.length - 1
            const newValue = this.mathInput.value.slice(0, lastSymbolIndex)
            this.mathInput.value = newValue
            this.wasNewResult = false
        })
        resultBtn?.addEventListener('click', () => {
            this.model.setExpression(this.mathInput.value)

        })
    }

    private formatExpression(expression: string) {
        return expression
            .replace(/\*/g, '×')
            .replace(/\//g, '÷')
    }
}

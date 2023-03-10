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

    }

    private renderResult(newResult: number) {
        if (!(this.mathInput && this.resultEl)) return
        this.wasNewResult = true
        this.resultEl.classList.add('visible')
        const expression = this.formatExpression(this.mathInput.value)
        this.resultEl.innerHTML = `${expression} = <b>${newResult}</b>`
        this.mathInput.value = newResult.toString()
    }

    private listenBtns() {
        const numberBtns = document.querySelectorAll<HTMLButtonElement>('[data-btn-num]')
        const actionBtns = document.querySelectorAll<HTMLButtonElement>('[data-btn-action]')
        const resultBtn = document.querySelector('#result-btn')

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

    private formatExpression(expression: string){
        return expression.replace(/\*/g, '×').replace(/\//g, '÷')
    }
}

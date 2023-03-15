import { Button } from './Elements/Button';
import { IError } from '../types/ICalculator';
import { ICalculatorModel, ICalculatorView } from "@components/Calculator/types/ICalculator";
import { CalculatorObserverEvent } from "../calculator-event";
import { getMathInput } from './getMathInput';
import { getCalculatorButtons } from './getCalculatorButtons';

export class CalculatorView implements ICalculatorView {
    private mathInput = getMathInput()
    private resultBlock = document.querySelector<HTMLDivElement>('#result-output')!

    constructor(private model: ICalculatorModel) {
        model.subscribe(CalculatorObserverEvent.Result, this.renderResult.bind(this))
        model.subscribe(CalculatorObserverEvent.Error, this.renderError.bind(this))
        this.mathInput.domEl.focus()
        this.conectButtons()
    }

    private renderResult(newResult: number) {
        this.resultBlock.classList.add('visible')
        const formatedExpression = this.formatExpression(this.mathInput.value)
        this.resultBlock.innerHTML = `<p class='showup'>${formatedExpression} = <b>${newResult}</b></p>`
        this.mathInput.value = newResult.toString()
    }

    private renderError(error: IError[]){
        this.resultBlock.classList.add('visible')
        const errorIndices = error.map(err => err.meta.errorIndex!)
        const errorString = this.mathInput.value.split('').reduce<string>((errAcc, char, i) => {

            return errAcc + ((errorIndices.includes(i)) ? `<span class='error'>${char}</span>` : char)
        }, '')        
        this.resultBlock.innerHTML = errorString
    }

    private conectButtons() {
        const { numpudButtons, operationsButton, resultBtn, removeSymbolBtn } = getCalculatorButtons()
        this.attachButtonHandlers(numpudButtons, 'text')
        this.attachButtonHandlers(operationsButton, 'action')

        removeSymbolBtn.onClick(() => {
            this.mathInput.value = this.mathInput.value.slice(0, -1)            
        })

        resultBtn.onClick(() => {
            if(this.mathInput.value.trim().length === 0) return
            this.model.setExpression(this.mathInput.value)
        })
    }

    private attachButtonHandlers(btns: Button[], metaTag: string) {
        btns.forEach(numButton => {
            numButton.onClick(() => {
                const newInputValue = this.mathInput.value + numButton.metaData[metaTag]
                this.mathInput.value = newInputValue
            })
        })
    }

    private formatExpression(expression: string) {
        const regex = /(\^(\d+|\([^()]*\)))/g;

        return expression
            .replace(/\*/g, '×')
            .replace(/\//g, '÷')
            .replace(/\-/g, '−')
            .replace(/sqrt/g, '√')
            .replace(regex, "<sup>$2</sup>")
    }
}

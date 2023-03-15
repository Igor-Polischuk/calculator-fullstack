import { Button } from './Elements/Button';
import { IError } from '../types/ICalculator';
import { ICalculatorModel, ICalculatorView } from "@components/Calculator/types/ICalculator";
import { CalculatorObserverEvent } from "../calculator-event";
import { getMathInput } from './getMathInput';
import { getCalculatorButtons } from './getCalculatorButtons';

export class CalculatorView implements ICalculatorView {
    private mathInput = getMathInput()

    constructor(private model: ICalculatorModel) {
        model.subscribe(CalculatorObserverEvent.Result, this.renderResult.bind(this))
        this.mathInput.domEl.focus()
        this.conectButtons()
    }

    private renderResult(newResult: number) {
        this.mathInput.value = newResult.toString()
    }

    private conectButtons() {
        const { numpudButtons, operationsButton, resultBtn, removeSymbolBtn } = getCalculatorButtons()
        this.attachButtonHandlers(numpudButtons, 'text')
        this.attachButtonHandlers(operationsButton, 'action')

        removeSymbolBtn.onClick(() => {
            this.mathInput.value = this.mathInput.value.slice(0, -1)            
        })

        resultBtn.onClick(() => {
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
        return expression
            .replace(/\*/g, '×')
            .replace(/\//g, '÷')
            .replace(/\-/g, '−')
    }
}

import { CalculatorInput } from "../CalculatorInput/CalculatorInput";
import { CalculatorOutput } from "../CalculatorOutput/CalculatorOutput";
import { IAppError, IErrorRange } from "common/AppError/IAppError";
import { DivElement } from "common/Elements/DivElement";
import { HistoryIcon } from "../HistoryIcon";


export class CalculatorDisplay extends DivElement {
    private calculatorInput: CalculatorInput;
    private calculatorOutput: CalculatorOutput;
    private historyIcon: HistoryIcon;

    constructor() {
        super({
            classNames: 'calculator__display'
        })

        this.calculatorInput = new CalculatorInput()
        this.calculatorOutput = new CalculatorOutput()
        this.historyIcon = new HistoryIcon()

        this.calculatorInput.inputElement.onInput(() => this.calculatorOutput.showInputtedValue(' '))

        this.append(this.historyIcon, this.calculatorOutput, this.calculatorInput)
    }

    get inputValue(): string {
        return this.calculatorInput.inputText
    }

    setExpression(expression: string): void {
        this.calculatorInput.setInputValue(expression)
    }

    setHistoryIconClick(callback: () => void): void {
        this.historyIcon.onClick(() => callback())
    }

    showResult(result: number) {
        this.domElement.classList.remove('display-error')
        const expression = this.calculatorInput.inputText
        this.calculatorInput.inputElement.value = result.toString()
        this.calculatorOutput.showCalculationResult({ result, expression })
    }

    showError(error: IAppError) {
        const expressionWithError = this.calculatorInput.inputText
        this.domElement.classList.add('display-error')

        this.calculatorOutput.showErrorInfo({
            error,
            expressionWithError,
            onErrorClick: this.onErrorClick.bind(this)
        })
    }

    private onErrorClick(range: IErrorRange): void {
        this.calculatorInput.inputElement.domElement.focus()
        this.calculatorInput.inputElement.domElement.setSelectionRange(range.from, range.to + 1)
    }
}
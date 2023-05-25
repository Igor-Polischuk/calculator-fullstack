import { CalculatorInput } from "../CalculatorInput/CalculatorInput";
import { CalculatorOutput } from "../CalculatorOutput/CalculatorOutput";
import { IAppError, IErrorRange } from "common/AppError/IAppError";
import { DivElement } from "common/Elements/DivElement";

export class CalculatorDisplay extends DivElement {
    private calculatorInput: CalculatorInput;
    private calculatorOutput: CalculatorOutput;

    constructor() {
        super({
            classNames: 'calculator__display'
        })

        this.calculatorInput = new CalculatorInput()
        this.calculatorOutput = new CalculatorOutput()

        this.calculatorInput.inputElement.onInput(() => this.calculatorOutput.showInputtedValue(this.calculatorInput.inputText || '0'))

        this.append(this.calculatorInput, this.calculatorOutput)
    }

    get inputValue() {
        return this.calculatorInput.inputText
    }

    setExpression(expression: string): void {
        this.calculatorInput.setInputValue(expression)
        this.calculatorOutput.showInputtedValue(expression || '0')
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
import { WrapperElement } from "@components/Elements/WrapperElement";
import { CalculatorInput } from "../CalculatorInput/CalculatorInput";
import { CalculatorOutput } from "../CalculatorOutput/CalculatorOutput";
import { IAppError, IErrorRange } from "errors/AppError";

export class CalculatorDisplay extends WrapperElement {
    private calculatorInput: CalculatorInput;
    private calculatorOutput: CalculatorOutput;

    constructor() {
        super({
            wrapperClassNames: 'calculator__display'
        })

        this.calculatorInput = new CalculatorInput()
        this.calculatorOutput = new CalculatorOutput()

        this.calculatorInput.inputElement.onInput(() => this.calculatorOutput.showInputtedValue(this.calculatorInput.inputText || '0'))

        this.wrapper.append(this.calculatorInput.element, this.calculatorOutput.element)
    }

    get inputValue() {
        return this.calculatorInput.inputText
    }

    setExpression(expression: string): void {
        this.calculatorInput.setInputValue(expression)
        this.calculatorOutput.showInputtedValue(expression || '0')
    }

    showResult(result: number) {
        this.wrapper.domElement.classList.remove('display-error')
        const expression = this.calculatorInput.inputText
        this.calculatorInput.inputElement.value = result.toString()
        this.calculatorOutput.showCalculationResult({ result, expression })
    }

    showError(error: IAppError) {
        const expressionWithError = this.calculatorInput.inputText
        this.wrapper.domElement.classList.add('display-error')

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
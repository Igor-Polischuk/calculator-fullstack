import { IError } from './../../interfaces/ICalculator';
import { CalculatorResultDisplay } from './ResultBlock/CalculatorResultDisplay';
import { DivElement } from "@components/Elements/DivElement";
import { Observer } from "@utilities/Observer/Observer";
import { CalculatorInput } from "./CalculatorInput/CalculatorInput";
import { CalculatorKeyboard } from "./CalculatorKeyboard/CalculatorKeyboard";

export class Calculator{
    private calculatorBlock = new DivElement({
        classNames: 'calculator'
    })

    private calculatorInput = new CalculatorInput()
    private resultBlock = new CalculatorResultDisplay()

    private calculatorKeyboard = new CalculatorKeyboard({
        resultBtnHandler: this.setExpression.bind(this),
        keyboardValueHandler: (value) => this.calculatorInput.update(value)
    })

    private newExpressionHandler: (expression: string) => void

    constructor(config: { newExpressionHandler: (expression: string) => void }) {
        this.calculatorBlock.append(
            this.calculatorInput.element,
            this.resultBlock.element,
            this.calculatorKeyboard.element)
        this.newExpressionHandler = config.newExpressionHandler
    }

    renderResult(result: number) {
        this.resultBlock.showResult(result, this.calculatorInput.inputText)
        const resultStr = result.toString()
        this.calculatorInput.update(resultStr)
        this.calculatorKeyboard.setValue(resultStr)
    }

    renderError(errors: IError[]) {
        this.resultBlock.showError(errors, this.calculatorInput.inputText)
    }

    get element() {
        return this.calculatorBlock
    }

    private setExpression() {
        const expression = this.calculatorInput.inputText
        this.newExpressionHandler(expression)
        // this.notifyAll(ViewEvent.EnteredExpressionChanged, expression)
    }
}
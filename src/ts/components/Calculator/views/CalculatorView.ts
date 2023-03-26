import { CalculatorUI } from './calculator/calculator';
import { ICalculatorModel, ICalculatorView } from "@components/Calculator/interfaces/ICalculator";
import { CalculatorModelEvent } from "../calculator-model-event";


export class CalculatorView implements ICalculatorView {
    private calculator = new CalculatorUI({
        newExpressionHandler: (expression) => this.model.setExpression(expression)
    })

    constructor(private model: ICalculatorModel) {
        const root = document.querySelector('.container')!
        this.calculator.element.render(root)

        model.subscribe(CalculatorModelEvent.ResultChanged, (result) => {
            this.calculator.renderResult(result)
        })
        model.subscribe(CalculatorModelEvent.ErrorChanged, (error) => {
            this.calculator.renderError(error)
        })
    }
}

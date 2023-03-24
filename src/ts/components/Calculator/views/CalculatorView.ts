import { Calculator } from './components/calculator';
import { ICalculatorModel, ICalculatorView } from "@components/Calculator/interfaces/ICalculator";
import { CalculatorModelEvent } from "../calculator-model-event";


export class CalculatorView implements ICalculatorView {
    private calculator = new Calculator()

    constructor(private model: ICalculatorModel) {
        const root = document.querySelector('.container')!
        this.calculator.element.render(root)

        this.calculator.subscribe('expression', (expression) => this.model.setExpression(expression))
        model.subscribe(CalculatorModelEvent.ResultChanged, (result) => {
            this.calculator.renderResult(result)
        })
        model.subscribe(CalculatorModelEvent.ErrorChanged, (error) => {
            this.calculator.renderError(error)
        })
    }
}

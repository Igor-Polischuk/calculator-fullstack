import { Calculator } from './components/calculator';
import { ICalculatorModel, ICalculatorView } from "@components/Calculator/interfaces/ICalculator";
import { CalculatorObserverEvent } from "../calculator-event";


export class CalculatorView implements ICalculatorView {
    private calculator = new Calculator()

    constructor(private model: ICalculatorModel) {
        const root = document.querySelector<HTMLDivElement>('.container')!
        this.calculator.container.insert(root)

        this.calculator.subscribe('expression', (expression) => this.model.setExpression(expression))
        model.subscribe(CalculatorObserverEvent.Result, (result) => {
            this.calculator.renderResult(result)
        })
        model.subscribe(CalculatorObserverEvent.Error, (error) => {
            this.calculator.renderError(error)
        })
    }
}

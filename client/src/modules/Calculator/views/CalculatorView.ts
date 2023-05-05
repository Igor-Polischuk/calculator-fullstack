import { CalculatorContainer } from './calculator/CalculatorContainer';
import { ICalculatorModel, ICalculatorView } from "@modules/Calculator/interfaces/ICalculator";
import { CalculatorModelEvent } from "../calculator-model-event";


export class CalculatorView implements ICalculatorView {
    private calculatorContainer: CalculatorContainer
    private model: ICalculatorModel

    constructor(model: ICalculatorModel) {
        this.model = model
        this.calculatorContainer = new CalculatorContainer({
            onEqual: (expression) => this.model.setExpression(expression)
        })

        model.subscribe(CalculatorModelEvent.ResultChanged, (result) => {
            this.calculatorContainer.showCalculationResult(result)
        })
        model.subscribe(CalculatorModelEvent.ErrorChanged, (error) => {
            this.calculatorContainer.showCalculationError(error)
        })

        model.subscribe(CalculatorModelEvent.ButtonsDataGenerated, buttonData => {
            this.calculatorContainer.addKeyboard(buttonData)
        })

        model.subscribe(CalculatorModelEvent.FetchedResult, loading => {
            this.calculatorContainer.processLoading(loading)
        })

        model.subscribe(CalculatorModelEvent.HistoryChanged, history => {
            this.calculatorContainer.updateHistory(history)
        })

        const root = document.querySelector('.container')!
        this.calculatorContainer.element.render(root)
    }
}

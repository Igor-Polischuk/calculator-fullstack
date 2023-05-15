import { CalculatorContainer } from './calculator/CalculatorContainer';
import { ICalculatorModel, ICalculatorView } from "@modules/Calculator/interfaces/ICalculator";
import { CalculatorModelEvent } from "../calculator-model-event";
import { ErrorType } from 'errors/error-type';


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
            const { type } = error;
            const action = type === ErrorType.ServerError || type === ErrorType.UnexpectedError ?
                "showServerError" :
                "showCalculationError";
            this.calculatorContainer[action](error);
        })

        model.subscribe(CalculatorModelEvent.ButtonsDataChanged, buttonData => {
            this.calculatorContainer.addKeyboard(buttonData)
        })

        model.subscribe(CalculatorModelEvent.HistoryChanged, history => {
            this.calculatorContainer.updateHistory(history)
        })

        model.subscribe(CalculatorModelEvent.LoadingData, loading => {
            const { loadingEvents } = loading;
            const action = loadingEvents.includes(CalculatorModelEvent.ResultChanged) ?
                "calculationLoading" :
                "processDataLoading";
            this.calculatorContainer[action](loading.loading);
        })

        const root = document.querySelector('.container')!
        this.calculatorContainer.render(root)
    }
}

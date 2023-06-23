import { ErrorType } from '@common/AppError/error-type';
import { ICalculatorModel, ICalculatorView } from "@modules/Calculator/interfaces/ICalculator";

import { CalculatorModelEvent } from "../models/calculator-model-event";
import { CalculatorContainer } from './calculator/CalculatorContainer';
import { container } from 'webpack';


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

        model.subscribe(CalculatorModelEvent.ButtonsDataChanged, buttonData => {
            this.calculatorContainer.addKeyboard(buttonData)
        })

        model.subscribe(CalculatorModelEvent.HistoryChanged, history => {
            this.calculatorContainer.updateHistory(history)
        })

        model.subscribe(CalculatorModelEvent.BaseDataLoadingChanged, loadingComponent => {
            this.calculatorContainer.processDataLoading(loadingComponent.isLoading)

            if (loadingComponent.error) {
                this.calculatorContainer.showServerError(loadingComponent.error)
            }
        })

        model.subscribe(CalculatorModelEvent.ResultLoadingChanged, loadingComponent => {
            this.calculatorContainer.calculationLoading(loadingComponent.isLoading)

            if (loadingComponent.error) {
                this.calculatorContainer.showCalculationError(loadingComponent.error)
            }
        })

        const root = document.querySelector('.container')!
        this.calculatorContainer.render(root)
    }
}

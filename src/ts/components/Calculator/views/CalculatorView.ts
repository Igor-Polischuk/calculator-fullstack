import { CalculatorContainer } from './calculator/CalculatorContainer';
import { ICalculatorModel, ICalculatorView } from "@components/Calculator/interfaces/ICalculator";
import { CalculatorModelEvent } from "../calculator-model-event";
import { CalculatorErrorsDetails } from './calculator/CalculatorDetail/CalculatorDetail';


export class CalculatorView implements ICalculatorView {
    private calculatorContainer: CalculatorContainer
    private calculatorDetail: CalculatorErrorsDetails
    private model: ICalculatorModel
    constructor(model: ICalculatorModel) {
        this.model = model
        this.calculatorDetail = new CalculatorErrorsDetails({ onErrorClick: () => { } });
        this.calculatorContainer = new CalculatorContainer({
            onEqual: (expression) => this.model.setExpression(expression)
        })

        model.subscribe(CalculatorModelEvent.ResultChanged, (result) => {
            this.calculatorContainer.showCalculationResult(result)
            this.calculatorDetail.hideDetail()
        })
        model.subscribe(CalculatorModelEvent.ErrorChanged, (error) => {
            this.calculatorContainer.showCalculationError(error)
            this.calculatorDetail.showErrorsInfo({
                errors: error,
                invalidExpression: this.model.getExpression()!
            })

        })

        const root = document.querySelector('.container')!
        this.calculatorContainer.element.render(root)
        this.calculatorDetail.element.render(root)
    }
}

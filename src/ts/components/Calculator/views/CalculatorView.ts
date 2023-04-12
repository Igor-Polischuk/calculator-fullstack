import { CalculatorContainer } from './calculator/CalculatorContainer';
import { ICalculatorModel, ICalculatorView } from "@components/Calculator/interfaces/ICalculator";
import { CalculatorModelEvent } from "../calculator-model-event";
import { CalculatorErrorsDetails } from './calculator/CalculatorDetail/CalculatorDetail';


export class CalculatorView implements ICalculatorView {
    private calculatorContainer: CalculatorContainer
    private calculatorErrorDetail: CalculatorErrorsDetails
    private model: ICalculatorModel
    constructor(model: ICalculatorModel) {
        this.model = model
        this.calculatorErrorDetail = new CalculatorErrorsDetails({ onErrorClick: () => { } });
        this.calculatorContainer = new CalculatorContainer({
            onEqual: (expression) => this.model.setExpression(expression)
        })

        model.subscribe(CalculatorModelEvent.ResultChanged, (result) => {
            this.calculatorContainer.showCalculationResult(result)
            this.calculatorErrorDetail.hideDetail()
        })
        model.subscribe(CalculatorModelEvent.ErrorChanged, (error) => {
            this.calculatorContainer.showCalculationError(error)
            this.calculatorErrorDetail.hideDetail()
            this.calculatorErrorDetail.showErrorsInfo({
                errors: error,
                invalidExpression: this.model.getExpression()!
            })

        })

        const root = document.querySelector('.container')!
        this.calculatorContainer.element.render(root)
        this.calculatorErrorDetail.element.render(root)
    }
}

import { Calculator } from './components/calculator';
import { BlockElement } from './../../Elements/BlockElement';
import { Button } from '../../Elements/Button';
import { IError } from '../interfaces/ICalculator';
import { ICalculatorModel, ICalculatorView } from "@components/Calculator/interfaces/ICalculator";
import { CalculatorObserverEvent } from "../calculator-event";
import { getMathInput } from './components/CalculatorInput/getMathInput';
import { getCalculatorButtons } from './components/Keyboard/getCalculatorButtons';
import { GridContainer } from '@components/Elements/GridContainer';

export class CalculatorView implements ICalculatorView {
    private calculator = new Calculator()

    constructor(private model: ICalculatorModel) {
        const root = document.querySelector<HTMLDivElement>('.container')!
        this.calculator.container.insert(root)

        this.calculator.subscribe('expression', (expression) => this.model.setExpression(expression))
        model.subscribe(CalculatorObserverEvent.Result, (result) => {
            this.calculator.renderResult(result)
        })
        // model.subscribe(CalculatorObserverEvent.Error, this.renderError.bind(this))
    }
}

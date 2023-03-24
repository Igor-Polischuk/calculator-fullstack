import { IError } from './../../interfaces/ICalculator';
import { ResultBlock } from './ResultBlock/ResultBlock';
import { DivElement } from "@components/Elements/DivElement";
import { Observer } from "@utilities/Observer/Observer";
import { CalculatorInput } from "./CalculatorInput/CalculatorInput";
import { CalculatorKeyboard } from "./Keyboard/Keyboard";
import { ViewEvent } from '../view-observer-events';

type CalculatorEvents = {
    [ViewEvent.EnteredExpressionChanged]: string
}

export class Calculator extends Observer<CalculatorEvents>{
    private calculatorBlock = new DivElement({
        classNames: ['calculator']
    })
    private calculatorKeyboard = new CalculatorKeyboard(this.setExpression.bind(this))
    private calculatorInput = new CalculatorInput()
    private resultBlock = new ResultBlock()
    constructor(){
        super()
        this.calculatorKeyboard.subscribe(ViewEvent.KeyboardValueChanged, (value) => this.calculatorInput.update(value))
        this.calculatorBlock.append(this.calculatorInput.element, this.resultBlock.element, this.calculatorKeyboard.element)
    }

    renderResult(result: number){
        this.resultBlock.showResult(result, this.calculatorInput.inputText)
        const resultStr = result.toString()
        this.calculatorInput.update(resultStr)
        this.calculatorKeyboard.setValue(resultStr)
    }

    renderError(errors: IError[]){
        this.resultBlock.showError(errors, this.calculatorInput.inputText)
    }

    get element(){
        return this.calculatorBlock
    }

    private setExpression(){
        const expression = this.calculatorInput.inputText
        this.notifyAll(ViewEvent.EnteredExpressionChanged, expression)
    }
}
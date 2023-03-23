import { IError } from './../../interfaces/ICalculator';
import { ResultBlock } from './ResultBlock/result-block';
import { BlockElement } from "@components/Elements/BlockElement";
import { Observer } from "@utilities/Observer/Observer";
import { CalculatorInput } from "./CalculatorInput/calculator-input";
import { Keyboard } from "./Keyboard/keyboard";

type CalculatorEvents = {
    expression: string
}

export class Calculator extends Observer<CalculatorEvents>{
    private calculatorBlock = new BlockElement({
        classNames: ['calculator']
    })
    private calculatorKeyboard = new Keyboard(this.setExpression.bind(this))
    private calculatorInput = new CalculatorInput()
    private resultBlock = new ResultBlock()
    constructor(){
        super()
        this.calculatorKeyboard.subscribe('value', (value) => this.calculatorInput.update(value))
        this.calculatorBlock.append(this.calculatorInput.element, this.resultBlock.element, this.calculatorKeyboard.element)
    }

    renderResult(result: number){
        this.resultBlock.showResult(result, this.calculatorInput.inputText)
        const resultStr = result.toString()
        this.calculatorInput.update(resultStr)
    }

    renderError(errors: IError[]){
        this.resultBlock.showError(errors, this.calculatorInput.inputText)
    }

    get container(){
        return this.calculatorBlock
    }

    private setExpression(){
        const expression = this.calculatorInput.inputText
        this.notifyAll('expression', expression)
    }
}
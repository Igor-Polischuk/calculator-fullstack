import { ICalculatorController, ICalculatorModel } from "@components/Calculator/types/ICalculator";
import { CalculatorObserverEvent } from "../calculator-event";
import { checkBrackets } from "./helpers/checkBrackets";

export class CalculatorController implements ICalculatorController{
    constructor (public model: ICalculatorModel){
        this.model.subscribe(CalculatorObserverEvent.Expression, (expression) => {
            this.calculate(expression);
        })
    }

    private calculate(expression: string){
        if (!checkBrackets(expression)) throw new Error('Incorrect order of brackets')
    }
}
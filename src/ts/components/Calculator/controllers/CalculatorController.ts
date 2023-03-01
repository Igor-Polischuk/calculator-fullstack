import { ICalculatorController, ICalculatorModel } from "@components/Calculator/types/ICalculator";
import { CalculatorObserverEvents } from "../calculator-events";

export class CalculatorController implements ICalculatorController{
    constructor (public model: ICalculatorModel){
        this.model.subscribe(CalculatorObserverEvents.EXPRESSION, this.calculate.bind(this))
    }

    private calculate(expression: string){
        console.log('calculate: ', expression);
        this.model.setResult(20)
    }
}
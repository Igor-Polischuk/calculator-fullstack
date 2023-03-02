import { ICalculatorController, ICalculatorModel } from "@components/Calculator/types/ICalculator";
import { CalculatorObserverEvent } from "../calculator-event";

export class CalculatorController implements ICalculatorController{
    constructor (public model: ICalculatorModel){
        this.model.subscribe(CalculatorObserverEvent.Expression, (expression) => {
            this.calculate(expression);
        })
    }

    private calculate(expression: string){
        console.log('calculate');
        // console.log('calculate: ', this);
        this.model.setResult(20)
    }
}
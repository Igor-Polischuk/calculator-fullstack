import { ICalculatorController, ICalculatorModel } from "@components/Calculator/types/ICalculator";
import { CalculatorObserverEvents } from "../calculator-events";

export class CalculatorController implements ICalculatorController{
    constructor (public model: ICalculatorModel){
        this.model.subscribe({
            event: CalculatorObserverEvents.EXPRESSION,
            handler: (data) => {
                this.calculate(data)
            }
        })
    }

    private calculate(expression: string){
        console.log('calculate');
        // console.log('calculate: ', this);
        this.model.setResult(20)
    }
}
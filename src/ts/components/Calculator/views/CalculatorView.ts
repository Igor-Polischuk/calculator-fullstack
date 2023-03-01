import { ICalculatorModel, ICalculatorView } from "@components/Calculator/types/ICalculator";
import { CalculatorObserverEvents } from "../calculator-events";

export class CalculatorView implements ICalculatorView{
    constructor (public model: ICalculatorModel){
        this.model.subscribe(CalculatorObserverEvents.RESULT, (res) => {
            this.renderResult(res)
        })
    }

    private renderResult(newResult: number){
        console.log('render new result: ', newResult);
        
    }
}
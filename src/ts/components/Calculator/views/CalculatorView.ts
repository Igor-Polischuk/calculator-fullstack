import { ICalculatorModel, ICalculatorView } from "@components/Calculator/types/ICalculator";
import { CalculatorObserverEvent } from "../calculator-event";

export class CalculatorView implements ICalculatorView{
    constructor (public model: ICalculatorModel){
        this.model.subscribe(CalculatorObserverEvent.Result, (result) => {
            this.renderResult(result)
        })
        this.model.subscribe(CalculatorObserverEvent.Expression, (res) => {

        })
    }

    private renderResult(newResult: number){
        console.log('view');
    }
}
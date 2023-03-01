import { ICalculatorModel, ICalculatorView } from "@components/Calculator/types/ICalculator";
import { CalculatorObserverEvents } from "../calculator-events";

export class CalculatorView implements ICalculatorView{
    private a: any
    constructor (public model: ICalculatorModel){
        this.a = this.model.subscribe({
            event: CalculatorObserverEvents.RESULT,
            handler: this.renderResult,
            context: this
        })
    }

    private renderResult(newResult: number){
        console.log('view');
        // console.log('view ',this);
        this.model.unsubscribe(CalculatorObserverEvents.RESULT, this.a)
    }
}
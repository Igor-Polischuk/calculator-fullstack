import { ICalculatorModel, ICalculatorView } from "@customTypes/ICalculator";

export class CalculatorView implements ICalculatorView{
    constructor (public model: ICalculatorModel){
        this.model.subscribe('result', this.renderResult)
    }

    private renderResult(newResult: number){
        console.log('render new result: ', newResult);
        
    }
}
import { ICalculatorModel, ICalculatorView } from "@components/Calculator/types/ICalculator";

export class CalculatorView implements ICalculatorView{
    constructor (public model: ICalculatorModel){
        this.model.subscribe('result', (res) => {
            this.renderResult(123)
        })
    }

    private renderResult(newResult: number){
        console.log('render new result: ', newResult);
        
    }
}
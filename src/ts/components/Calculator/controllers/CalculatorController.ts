import { ICalculatorController, ICalculatorModel } from "@components/Calculator/types/ICalculator";

export class CalculatorController implements ICalculatorController{
    constructor (public model: ICalculatorModel){
        this.model.subscribe('result', this.calculate)
    }

    private calculate(expression: string){
        console.log('calculate: ', expression);
        this.model.setResult(20)
    }
}
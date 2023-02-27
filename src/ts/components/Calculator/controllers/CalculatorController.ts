import { ICalculatorController } from "@customTypes/ICalculator";

export class CalculatorController implements ICalculatorController{
    update(expression: string){
        console.log('controller motifyed', expression);
    }
}
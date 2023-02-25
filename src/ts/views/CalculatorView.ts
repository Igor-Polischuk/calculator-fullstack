import { ICalculatorView } from "@customTypes/ICalculator";

export class CalculatorView implements ICalculatorView{
    update(result: number){
        console.log('view motifyed', result);
    }
}
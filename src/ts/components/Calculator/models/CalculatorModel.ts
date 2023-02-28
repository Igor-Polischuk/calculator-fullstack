import { Observer } from "@components/Observer";
import { ICalculatorModel } from "@customTypes/ICalculator";


export class CalculatorModel extends Observer implements ICalculatorModel{
    private result: number | null = null;
    private expression: string | null = null;

    setResult(res: number) {
        this.result = res;
    }

    setExpression(expression: string) {
        this.expression = expression;
    }
}

import { Observer } from "@components/Observer";
import { ICalculatorModel } from "@customTypes/ICalculator";


export class CalculatorModel extends Observer implements ICalculatorModel{
    private result: number | null = null;
    private expression: string | null = null;

    setResult(res: number) {
        this.result = res;
        this.notifyAll('result', res)
    }

    setExpression(expression: string) {
        this.expression = expression;
        this.notifyAll('expression', expression)
    }
}

import { ICalculatorModel } from "@customTypes/ICalculator";
import { Observer } from "./Observer";

export class CalculatorModel implements ICalculatorModel {
    public expressionChanel = new Observer<string>()
    public resultChanel = new Observer<number>()
    private result: number = NaN
    private expression: string = ''

    setResult(res: number) {
        this.result = res
        this.resultChanel.notify(res)
    }

    setExpression(expression: string) {
        this.expression = expression
        this.expressionChanel.notify(expression)
    }
}
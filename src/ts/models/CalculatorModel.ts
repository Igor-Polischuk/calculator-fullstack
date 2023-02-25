import { ICalculatorModel } from "@customTypes/ICalculator";
import { Observer } from "./Observer";

export class CalculatorModel implements ICalculatorModel {
    constructor(
        public expressionChanel = new Observer(),
        public resultChanel = new Observer(),
        private result: number,
        private expression: string
    ) { }

    setResult(res: number) {
        this.result = res
        this.resultChanel.notify(res)
    }

    setExpression(expression: string) {
        this.expression = expression
        this.resultChanel.notify(expression)
    }
}
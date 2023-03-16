import { IOperation } from "@components/Calculator/types/ICalculator";
import { getNumberReg } from "../helpers/reg";

export class Operation implements IOperation {
    private action: string
    private reg: RegExp
    private calculate: (...args: number[]) => number
    readonly priority: number

    constructor(config: {
        operation: string
        reg: RegExp
        priority: number
        calculate: (...args: number[]) => number
    }) {
        this.action = config.operation
        this.reg = config.reg
        this.calculate = config.calculate
        this.priority = config.priority
    }

    public calculateOperation(expression: string) {
        const matches = expression.match(this.reg)
        if (!matches) return {
            evaluatedExpression: expression,
            result: +expression
        }
        const [evaluatedExpression] = matches
        const numbersInExpression = evaluatedExpression.match(getNumberReg())
        const numbers = numbersInExpression?.map(number => +number) ?? []
        console.log(evaluatedExpression, numbers);
        
        const result = this.calculate(...numbers)
        console.log(result);
        
        return {
                evaluatedExpression,
                result: result
            }

    }
}

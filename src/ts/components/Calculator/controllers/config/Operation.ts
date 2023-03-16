import { IOperation } from "@components/Calculator/types/ICalculator";
import { getFunctionRegWithParam, getNumberReg } from "../helpers/reg";
import { Priority } from "./priority";

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
        
        const result = this.calculate(...numbers)
        return {
                evaluatedExpression,
                result: result
            }

    }
}

export class MathFuction extends Operation{
    constructor(config: {name: string, func: (...args: number[]) => number}){
        super({
            operation: config.name,
            reg: getFunctionRegWithParam(config.name),
            priority: Priority.Hight,
            calculate: config.func
        });
    }
}

export class Constant extends Operation{
    constructor(name: string,  value: number){
        super({
            operation: name,
            reg: new RegExp(name),
            priority: Priority.Constant,
            calculate: () => value
        });
    }
}

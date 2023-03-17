import { IError, IOperation } from "@components/Calculator/interfaces/ICalculator";
import { getFunctionRegWithParam, getNumberReg } from "../services/regExpressions";
import { exceptionObj } from "./exceptions";
import { Priority } from "./priority";

export class Operation implements IOperation {
    private reg: RegExp
    private calculate: (...args: number[]) => number
    private exceptionHandler: ((...args: number[]) => boolean) | undefined
    private exceptionMessege: string | undefined
    readonly priority: number

    constructor(config: {
        reg: RegExp
        priority: number
        calculate: (...args: number[]) => number,
        exceptionHandler?: exceptionObj
    }) {
        this.reg = config.reg
        this.calculate = config.calculate
        this.exceptionHandler = config.exceptionHandler?.checkException 
        this.exceptionMessege = config.exceptionHandler?.exceptionText 
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
        
        this.checkException(numbers)

        const result = this.calculate(...numbers)
        return {
                evaluatedExpression,
                result: result
            }
    }

    private checkException(numbers: number[]): void{
        if (!this.exceptionHandler) return
        const isCorrect = this.exceptionHandler(...numbers)
        
        if (isCorrect){
            const error: IError = {
                message: this.exceptionMessege!,
                meta: {}
            }
            throw error
        }
    }
}

export class MathFuction extends Operation{
    constructor(config: {name: string, func: (...args: number[]) => number, exceptionHandler?: exceptionObj}){
        super({
            reg: getFunctionRegWithParam(config.name),
            priority: Priority.Hight,
            calculate: config.func,
            exceptionHandler: config.exceptionHandler
        });
    }
}

export class Constant extends Operation{
    constructor(name: string,  value: number){
        super({
            reg: new RegExp(name),
            priority: Priority.Constant,
            calculate: () => value
        });
    }
}

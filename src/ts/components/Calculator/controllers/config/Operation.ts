import { IOperation } from "@components/Calculator/interfaces/ICalculator";
import { regularWithParam } from "../regex";
import { IExceptionObj } from "./exceptions";
import { Priority } from "./priority";
import { IError } from "exceptions/IErrors";
import { ErrorType } from "exceptions/error-type";
import { AppError } from "exceptions/AppError";

export class Operation implements IOperation {
    readonly reg: RegExp
    readonly calculate: (...args: number[]) => number
    private exceptionHandler: IExceptionObj[] = []
    readonly priority: number
    readonly text
    constructor(params: {
        reg: RegExp
        priority: number
        calculate: (...args: number[]) => number,
        exceptionHandler?: IExceptionObj[],
        text?: string
    }) {
        this.reg = params.reg
        this.calculate = params.calculate
        this.exceptionHandler = params.exceptionHandler || []
        this.priority = params.priority
        this.text = params.text
    }

    checkException(numbers: number[], errorExpression?: string): void {
        if (this.exceptionHandler.length === 0) return
        const whereMessage = errorExpression ? `in ${errorExpression}` : ''
        this.exceptionHandler.forEach(exception => {
            const isException = exception.checkException(...numbers)
            if (isException) {
                const error: IError = {
                    message: `Runtime error: ${exception.exceptionMessage} ${whereMessage}`,
                    payload: {
                        currentExpressionSnapshot: errorExpression
                    }
                }
                throw new AppError({
                    type: ErrorType.RuntimeError,
                    errors: [error]
                })
            }
        })
    }
}

export class MathFunction extends Operation {
    constructor(params: { name: string, func: (...args: number[]) => number, exceptionHandler?: IExceptionObj[], text?: string }) {
        super({
            reg: regularWithParam.getFunctionRegWithParam(params.name),
            priority: Priority.Hight,
            calculate: params.func,
            exceptionHandler: params.exceptionHandler,
            text: params.text
        });
    }
}

export class Constant extends Operation {
    constructor(params: { name: string, value: number, reg?: RegExp, text?: string }) {
        super({
            reg: params.reg ? params.reg : regularWithParam.getConstantReg(params.name),
            priority: Priority.Constant,
            calculate: () => params.value,
            text: params.text
        });
    }
}

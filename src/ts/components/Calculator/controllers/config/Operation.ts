import { IError, IOperation } from "@components/Calculator/interfaces/ICalculator";
import { regularWithParam } from "../regex";
import { IExceptionObj } from "./exceptions";
import { Priority } from "./priority";

export class Operation implements IOperation {
    readonly reg: RegExp
    readonly calculate: (...args: number[]) => number
    private exceptionHandler: IExceptionObj[] = []
    readonly priority: number
    readonly text
    constructor(config: {
        reg: RegExp
        priority: number
        calculate: (...args: number[]) => number,
        exceptionHandler?: IExceptionObj[],
        text?: string
    }) {
        this.reg = config.reg
        this.calculate = config.calculate
        this.exceptionHandler = config.exceptionHandler || []
        this.priority = config.priority
        this.text = config.text
    }

    checkException(numbers: number[]): void {
        if (this.exceptionHandler.length === 0) return

        this.exceptionHandler.forEach(exception => {
            const isException = exception.checkException(...numbers)
            if (isException){
                const error: IError = {
                    message: `${exception.exceptionMessage}`,
                    meta: {
                        description: `${exception.exceptionMessage}`
                    }
                }
                throw [error]
            }
        })
    }
}

export class MathFunction extends Operation {
    constructor(config: { name: string, func: (...args: number[]) => number, exceptionHandler?: IExceptionObj[], text?: string }) {
        super({
            reg: regularWithParam.getFunctionRegWithParam(config.name),
            priority: Priority.Hight,
            calculate: config.func,
            exceptionHandler: config.exceptionHandler,
            text: config.text
        });
    }
}

export class Constant extends Operation {
    constructor(config: {name: string, value: number, reg?: RegExp, text?: string}) {
        super({
            reg: config.reg ? config.reg : new RegExp(config.name),
            priority: Priority.Constant,
            calculate: () => config.value,
            text: config.text
        });
    }
}

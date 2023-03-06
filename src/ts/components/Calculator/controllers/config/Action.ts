import { IAction } from "@components/Calculator/types/ICalculator";
import { Priority } from "./priority";
import { getNumberReg } from "../helpers/reg";

export class Action implements IAction {
    private action: string
    private reg: RegExp
    private calculate: (...args: number[]) => number
    readonly priority: number

    constructor(config: {
        action: string
        reg: RegExp
        priority: number
        calculate: (...args: number[]) => number
    }) {
        this.action = config.action
        this.reg = config.reg
        this.calculate = config.calculate
        this.priority = config.priority
    }

    public doAction(expression: string) {
        const matches = expression.match(this.reg)
        if (!matches) return expression
        const expressionParts = matches[0].split(this.action).filter(num => getNumberReg().test(num)).map(i => +i)
        const res = this.calculate(...expressionParts)
        return expression.replace(matches[0], res.toString())
    }
}

export class LowPriorityAction extends Action {
    constructor(config: {
        action: string
        reg: RegExp
        calculate: (...args: number[]) => number
    }) {
        super({
            ...config,
            priority: Priority.Low,
        });
    }
}

export class HightPriorityAction extends Action {
    constructor(config: {
        action: string
        reg: RegExp
        calculate: (...args: number[]) => number
    }) {
        super({
            ...config,
            priority: Priority.Hight,
        });
    }
}

export class MediumPriorityAction extends Action {
    constructor(config: {
        action: string
        reg: RegExp
        calculate: (...args: number[]) => number
    }) {
        super({
            ...config,
            priority: Priority.Medium,
        });
    }
}
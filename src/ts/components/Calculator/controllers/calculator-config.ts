interface IPriority{
    [priority: string]: number
}

export const Priority: IPriority = {
    Hight: 2,
    Medium: 1,
    Low: 0,
}

interface ICalculatorCongig {
  [action: string]: {
    priority: number;
    reg: RegExp;
    calculate: (...args: number[]) => number;
    doAction: (expression: string) => string;
  };
}

export const calculatorCongig: ICalculatorCongig = {
    '+': {
        priority: Priority.Low,
        reg: /^[-]?\d+(\.\d+)?[+][-]?\d+(\.\d+)?/,
        calculate: (a: number, b: number) => a + b,
        doAction(expression: string) { return commonActions(expression, '+', this.reg, this.calculate) }
    },
    '-': {
        priority: Priority.Low,
        reg: /\d+(\.\d+)?[-]\d+(\.\d+)?/,
        calculate: (a: number, b: number) => a - b,
        doAction(expression: string) { return commonActions(expression, '-', this.reg, this.calculate) }
    },
    '*': {
        priority: Priority.Medium,
        reg: /[-]?\d+(\.\d+)?\*[-]?\d+(\.\d+)?/,
        calculate: (a: number, b: number) => a * b,
        doAction(expression: string) { return commonActions(expression, '*', this.reg, this.calculate) }
    },
    '/': {
        priority: Priority.Medium,
        reg: /\d+(\.\d+)?\/[-]?\d+(\.\d+)?/,
        calculate: (a: number, b: number) => a / b,
        doAction(expression: string) { return commonActions(expression, '/', this.reg, this.calculate) }
    }
}

function commonActions(expression: string, action: string, reg: RegExp, handler: Function) {
    const matches = expression.match(reg)
    if (!matches) return expression
    const expressionParts = matches[0].split(action)
    const res = handler(+expressionParts[0], +expressionParts[1])
    return expression.replace(matches[0], res.toString())
}
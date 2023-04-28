import { constantReg, searchAllowedOperationsRegStr } from "@services/calculatorService/expressionCalculation/calculator-config"

export function getOperationsFromExpression(expression: string): string[] {
    const minusInNumberReg = new RegExp(`(?<![0-9${constantReg}])-`, 'g')

    const operations = expression
        .replace(minusInNumberReg, '')
        .match(RegExp(searchAllowedOperationsRegStr, 'g'))
    return operations || []
}


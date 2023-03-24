import { calculatorConfig } from "../../config/calculator-config";
import { IError } from "@components/Calculator/interfaces/ICalculator"
import { processExpression } from "../../services";

export function calculationValidation(expression: string): IError | undefined {
    if (Number(expression)) {
        return
    }

    const expressionValidation = processExpression(validateUnbracketedExpression)
    const replacingResult = expressionValidation(expression)

    if (replacingResult === '0') {
        return
    }

    return {
        message: 'unresolved expression format',
        meta: {
            description: replacingResult.replace('0', '...')
        }
    }
}

function validateUnbracketedExpression(resultAcc: string, operation: string): string {
    const currentOperationObj = calculatorConfig[operation];
    const matchedExpressionWithOperation = resultAcc.match(currentOperationObj.reg)
    if (!matchedExpressionWithOperation) {
        return resultAcc
    }   
    return resultAcc.replace(matchedExpressionWithOperation[0], '0')
}
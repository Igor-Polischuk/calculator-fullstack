import { calculatorConfig } from "../../config/calculator-config";
import { IError } from "@components/Calculator/interfaces/ICalculator"
import { processExpression, unwrapBracketInExpression } from "../../services";
import { bracketsOrder } from "../bracketsOrder";

export function calculationValidation(checkedExpression: string): IError | undefined {
    if (Number(checkedExpression)) {
        return
    }

    const expression = bracketsOrder(checkedExpression) === -1 ? checkedExpression : unwrapBracketInExpression(checkedExpression)

    const expressionValidation = processExpression(validateUnbracketedExpression)
    const replacingResult = expressionValidation(expression)
    
    const wrongPartsOfExpression = replacingResult.split('0').filter(char => char !== '')

    if (replacingResult === '0') {
        return
    }

    return {
        message: 'unresolved expression format',
        meta: {
            invalidExpressionPart: wrongPartsOfExpression
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
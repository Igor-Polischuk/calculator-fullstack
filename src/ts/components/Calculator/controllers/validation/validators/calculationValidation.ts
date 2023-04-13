import { calculatorConfig } from "../../config/calculator-config";
import { IError } from "@components/Calculator/interfaces/ICalculator"
import { processExpression, unwrapBracketInExpression } from "../../services";
import { bracketsOrder } from "../helpers/bracketsOrder";
import { getSubstringsIndexes } from '../helpers/getSubstringsIndexes';

export function calculationValidation(checkedExpression: string): IError | undefined {
    if (Number(checkedExpression)) {
        return
    }

    const expression = bracketsOrder(checkedExpression) === -1 ? checkedExpression : unwrapBracketInExpression(checkedExpression)

    const expressionValidation = processExpression(validateUnbracketedExpression)
    const replacingResult = expressionValidation(expression)

    if (replacingResult === '0') {
        return
    }

    const invalidPartsOfExpression = replacingResult.split('0').filter(char => char !== '')
    const indexesOfInvalidExpressionParts = getSubstringsIndexes(invalidPartsOfExpression, expression)

    return {
        message: 'unresolved expression format',
        errorPlace: indexesOfInvalidExpressionParts
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
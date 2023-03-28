import { findSubstringIndexes } from '@utilities/findSubstringIndexes';
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

    if (replacingResult === '0') {
        return
    }

    const indexesOfInvalidExpressionParts = getInvalidPartsIndexes(replacingResult, expression)

    return {
        message: 'unresolved expression format',
        errorRange: indexesOfInvalidExpressionParts
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

function getInvalidPartsIndexes(replacingResult: string, expression: string) {
    const invalidPartsOfExpression = replacingResult.split('0').filter(char => char !== '')
    const indexesOfInvalidExpressionParts = invalidPartsOfExpression.reduce<[number, number][]>((indexesAcc, invalidPart) => {
        const indexesOfCurrentParts = findSubstringIndexes(expression, invalidPart)
        return [...indexesAcc, ...indexesOfCurrentParts]
    }, [])
    return indexesOfInvalidExpressionParts
}
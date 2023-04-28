import {
    bracketsOrderValidator,
    pointValidator,
    zeroDivisionValidator,
    operationsInRow,
    unknownSymbolValidator,
    expressionStartValidator,
    expressionEndValidator,
    bracketsSiblingsValidator,
    functionValidator
} from "./validators"

import { ExpressionValidationError, IExpressionValidationError } from "./ExpressionValidationError"

type ValidateFunction = (expression: string) => IExpressionValidationError | undefined

export function validate(expression: string): true {
    const validateResult = validateExpression(expression, [
        pointValidator,
        bracketsOrderValidator,
        bracketsSiblingsValidator,
        zeroDivisionValidator,
        operationsInRow,
        unknownSymbolValidator,
        expressionStartValidator,
        expressionEndValidator,
        functionValidator
    ])
    if (validateResult.length > 0) {
        throw new ExpressionValidationError(validateResult)
    }

    return true
}

function validateExpression(expression: string, validators: ValidateFunction[]): IExpressionValidationError[] {
    const errors = validators.flatMap(validatorName => {
        const validateResult = validatorName(expression)

        return validateResult ? validateResult : []
    })

    return errors
}


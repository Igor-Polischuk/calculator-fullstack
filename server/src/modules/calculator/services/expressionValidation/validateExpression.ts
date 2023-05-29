import { ExpressionValidationError, IExpressionValidationError } from "@utils/AppErrors/ExpressionValidationError"
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
import { calculatorLog } from "@modules/calculator/utils/calculatorLog"


type ValidateFunction = (expression: string) => IExpressionValidationError | undefined

export function validateExpression(expression: string): true {
    calculatorLog.info(`Validate expression: ${expression}`)

    const validateResult = validate(expression, [
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
        calculatorLog.warn(`Expression invalid: ${JSON.stringify(validateResult)}`)
        throw new ExpressionValidationError(validateResult)
    }

    return true
}

function validate(expression: string, validators: ValidateFunction[]): IExpressionValidationError[] {
    const errors = validators.flatMap(validatorName => {
        const validateResult = validatorName(expression)

        return validateResult ? validateResult : []
    })

    return errors
}


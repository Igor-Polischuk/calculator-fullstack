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
import { logger } from "@modules/common/logger"
import { removeSpaces } from "../helpers/text-formatting/removeSpaces"


type ValidateFunction = (expression: string) => IExpressionValidationError | undefined

export function validateExpression(expression: string): true {
    logger.info(`Validate expression: ${expression}`)

    const expressionWithoutSpaces = removeSpaces(expression)

    const validateResult = validate(expressionWithoutSpaces, [
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
        logger.info(`Expression invalid: ${expression}`)
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


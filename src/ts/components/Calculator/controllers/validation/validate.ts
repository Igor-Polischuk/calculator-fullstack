import { IError } from "exceptions/IErrors"
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
} from "./validators/"
import { ErrorType } from "exceptions/error-type"
import { AppError } from "exceptions/AppError"

interface IValidators {
    [validatorName: string]: (expression: string) => IError | undefined
}

export function validate(expression: string): void {
    const validateResult = validateExpression(expression, {
        pointValidator,
        bracketsOrderValidator,
        bracketsSiblingsValidator,
        zeroDivisionValidator,
        operationsInRow,
        unknownSymbolValidator,
        expressionStartValidator,
        expressionEndValidator,
        functionValidator
    })
    if (validateResult.length > 0) {
        throw new AppError({
            type: ErrorType.ValidationError,
            errors: validateResult
        })

    }
}

function validateExpression(expression: string, validators: IValidators): IError[] {
    const errors = Object.keys(validators).map(validatorName => {
        const validateFunction = validators[validatorName]
        const validateResult = validateFunction(expression)

        return validateResult ? validateResult : []
    }).flat()

    return errors
}


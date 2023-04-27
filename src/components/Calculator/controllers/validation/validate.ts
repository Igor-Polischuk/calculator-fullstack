import { IError } from "errors/IErrors"
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
import { ErrorType } from "errors/error-type"
import { AppError } from "errors/AppError"

interface IValidators {
    [validatorName: string]: (expression: string) => IError | undefined
}

type FunctionValidator = (expression: string) => IError | undefined

export function validate(expression: string): void {
    const validateResult = validateExpression(expression, [
        pointValidator,
        bracketsOrderValidator,
        bracketsSiblingsValidator,
        zeroDivisionValidator,
        operationsInRow,
        unknownSymbolValidator,
        expressionStartValidator,
        expressionEndValidator,
        functionValidator,
    ])

    if (validateResult.length > 0) {
        throw new AppError({
            type: ErrorType.ValidationError,
            errors: validateResult
        })
    }
}

function validateExpression(expression: string, validators: FunctionValidator[]): IError[] {
    const errors = validators.map(validator => {
        const validateResult = validator(expression)

        return validateResult ? validateResult : []
    }).flat()

    return errors
}


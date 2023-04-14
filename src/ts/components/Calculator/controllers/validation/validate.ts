import { IValidationError } from "@components/Calculator/interfaces/ICalculator"
import {
    bracketsOrderValidator,
    pointValidator,
    zeroDivisionValidator,
    operationsInRow,
    unknownSymbolValidator,
    expressionStartValidator,
    expressionEndValidator,
    bracketsSiblingsValidator
} from "./validators/"

interface IValidators {
    [validatorName: string]: (expression: string) => IValidationError | undefined
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
        expressionEndValidator
    })
    if (validateResult.length > 0) {
        throw validateResult
    }
}

function validateExpression(expression: string, validators: IValidators): IValidationError[] {
    const errors = Object.keys(validators).map(validatorName => {
        const validateFunction = validators[validatorName]
        const validateResult = validateFunction(expression)

        return validateResult ? validateResult : []
    }).flat()

    return errors
}


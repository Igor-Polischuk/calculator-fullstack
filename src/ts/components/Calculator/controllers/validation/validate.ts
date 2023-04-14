import { IValidationError } from "@components/Calculator/interfaces/ICalculator"
import { bracketsValidator, pointValidator, zeroDivisionValidator, operationsInRow } from "./validators/"

interface IValidators {
    [validatorName: string]: (expression: string) => IValidationError | undefined
}

export function validate(expression: string): void {
    const validateResult = validateExpression(expression, {
        pointValidator,
        bracketsValidator,
        zeroDivisionValidator,
        operationsInRow
        // calculationValidation,
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


import { IError } from "@components/Calculator/interfaces/ICalculator"
import { bracketsValidator, calculationValidation, zeroDivisionValidator } from "./validators/"

interface IValidators {
    [validatorName: string]: (expression: string) => IError | undefined
}

export function validate(expression: string) {
    const validateResult = validateExpression(expression, {
        bracketsValidator,
        zeroDivisionValidator,
    })
    if (validateResult.length > 0) {
        throw validateResult
    }

    const validateCalculation = validateExpression(expression, { calculationValidation })
    if (validateCalculation.length > 0) {
        throw validateCalculation
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


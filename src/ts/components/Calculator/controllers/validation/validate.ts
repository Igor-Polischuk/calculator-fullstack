import { IError } from "@components/Calculator/interfaces/ICalculator"
import { bracketsValidator, calculationValidation, pointValidate, zeroDivisionValidator } from "./validators/"

interface Ivalidators {
    [validatorName: string]: (expression: string) => IError | undefined
}

export function validate(erxpression: string) {
    const validateResult = validateExpression(erxpression, {
        bracketsValidator,
        zeroDivisionValidator,
        pointValidate,
        calculationValidation,
    })
    if (validateResult.length > 0) {
        throw validateResult
    }
}

function validateExpression(expression: string, validators: Ivalidators): IError[] {
    const errors = Object.keys(validators).map(validatorName => {
        const validateFunction = validators[validatorName]
        const validateResult = validateFunction(expression)

        return validateResult ? validateResult : []
    }).flat()

    return errors
}


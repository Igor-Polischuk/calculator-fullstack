import { IError } from "@components/Calculator/interfaces/ICalculator"
import { actio0nQueueValidator, bracketsValidator, expressionEndValidator, expressionStartValidator, pointValidate, unknownActionsvalidator, zeroDivisionValidator } from "./validators/"

interface Ivalidators {
    [validatorName: string]: (expression: string) => IError | undefined
}

export function validate(erxpression: string) {
    const validateResult = validateExpression(erxpression, {
        bracketsValidator,
        zeroDivisionValidator,
        unknownActionsvalidator,
        actio0nQueueValidator,
        pointValidate,
        expressionEndValidator,
        expressionStartValidator
    })
    return validateResult
}

function validateExpression(expression: string, validators: Ivalidators): IError[] {
    const errors = Object.keys(validators).map(validatorName => {
        const validateFunction = validators[validatorName]
        const validateResult = validateFunction(expression)

        return validateResult ? validateResult : []
    }).flat()
    
    return errors
}


import { IExpressionValidationError } from "@utils/AppErrors/ExpressionValidationError"
import { regexPatterns } from "../../helpers/regex"
import { ValidationError } from "../validation-error"

export function expressionStartValidator(expression: string): IExpressionValidationError | undefined {
    const isCorrectStart = regexPatterns.EXPRESSION_START.test(expression)

    if (!isCorrectStart) {
        return {
            message: ValidationError.LineStartError,
            errorPlace: [{ from: 0, to: 0 }]
        }
    }
}
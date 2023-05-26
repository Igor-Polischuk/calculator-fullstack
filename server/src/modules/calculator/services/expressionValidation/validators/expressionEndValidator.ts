import { IExpressionValidationError } from "@utils/AppErrors/ExpressionValidationError"
import { regexPatterns } from "../../helpers/regex"
import { ValidationError } from "../validation-error"


export function expressionEndValidator(expression: string): IExpressionValidationError | undefined {
    const isCorrectEnd = regexPatterns.EXPRESSION_END.test(expression)

    if (!isCorrectEnd) {
        return {
            message: ValidationError.LineEndError,
            errorPlace: [{ from: expression.length - 1, to: expression.length - 1 }]
        }
    }
}
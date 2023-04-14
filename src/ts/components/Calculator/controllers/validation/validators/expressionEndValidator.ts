import { IValidationError } from "@components/Calculator/interfaces/ICalculator";
import { Error } from "../error"
import { regexPatterns } from "../../regex";

export function expressionEndValidator(expression: string): IValidationError | undefined {
    const isCorrectEnd = regexPatterns.EXPRESSION_END.test(expression)

    if (!isCorrectEnd) {
        return {
            message: Error.LineEndError,
            errorPlace: [{ from: expression.length - 1, to: expression.length - 1 }]
        }
    }
}
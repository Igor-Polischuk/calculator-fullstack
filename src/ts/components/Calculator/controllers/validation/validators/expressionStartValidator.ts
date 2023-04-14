import { IValidationError } from "@components/Calculator/interfaces/ICalculator";
import { Error } from "../error"
import { regexPatterns } from "../../regex";

export function expressionStartValidator(expression: string): IValidationError | undefined {
    const isCorrectStart = regexPatterns.EXPRESSION_START.test(expression)

    if (!isCorrectStart) {
        return {
            message: Error.LineStartError,
            errorPlace: [{ from: 0, to: 0 }]
        }
    }
}
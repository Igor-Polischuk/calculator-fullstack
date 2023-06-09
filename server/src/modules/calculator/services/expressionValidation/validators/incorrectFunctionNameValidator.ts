import { IExpressionValidationError } from "@utils/AppErrors/ExpressionValidationError"
import { calculatorConfig } from "../../calculator-config"
import { getSubstringsIndexes } from "../../helpers/getSubstringsIndexes"
import { regexPatterns } from "../../helpers/regex"
import { ValidationError } from "../validation-error"

export function incorrectFunctionNameValidator(expression: string): IExpressionValidationError | undefined {
    const allWords = expression.match(regexPatterns.ALL_WORDS)

    if (allWords) {
        for (let i = 0; i < allWords.length; i++) {
            const word = allWords[i]
            if (!calculatorConfig[word]) {
                return {
                    message: ValidationError.IncorrectFunctionNameError,
                    errorPlace: getSubstringsIndexes([word], expression)
                }
            }
        }
    }
}
import { IError } from "errors/IErrors";
import { regexPatterns } from "../../regex";
import { calculatorConfig } from "../../calculator-config";
import { getSubstringsIndexes } from "../helpers/getSubstringsIndexes";
import { ValidationError } from "../validation-error"

export function incorrectFunctionNameValidator(expression: string): IError | undefined {
    const allWords = expression.match(regexPatterns.ALL_WORDS)

    if (allWords) {
        for (let i = 0; i < allWords.length; i++) {
            const word = allWords[i]
            if (!calculatorConfig[word]) {
                return {
                    message: ValidationError.IncorrectFunctionNameError,
                    payload: {
                        errorPlace: getSubstringsIndexes([word], expression)
                    }
                }
            }
        }
    }
}
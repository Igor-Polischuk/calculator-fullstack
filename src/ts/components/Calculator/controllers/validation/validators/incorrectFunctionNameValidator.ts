import { IError } from "@components/Calculator/interfaces/ICalculator";
import { regexPatterns } from "../../regex";
import { calculatorConfig } from "../../config/calculator-config";
import { getSubstringsIndexes } from "../helpers/getSubstringsIndexes";
import { Error } from "../error"

export function incorrectFunctionNameValidator(expression: string): IError | undefined {
    const allWords = expression.match(regexPatterns.ALL_WORDS)

    if (allWords) {
        for (let i = 0; i < allWords.length; i++) {
            const word = allWords[i]
            if (!calculatorConfig[word]) {
                return {
                    message: Error.IncorrectFunctionNameError,
                    payload: {
                        errorPlace: getSubstringsIndexes([word], expression)
                    }
                }
            }
        }
    }
}
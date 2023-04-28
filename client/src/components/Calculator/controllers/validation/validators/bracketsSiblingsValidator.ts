import { IError, IErrorRange } from "errors/IErrors";
import { ValidationError } from "../validation-error";
import { regexPatterns } from "../../regex";
import { getSubstringsIndexes } from "../helpers/getSubstringsIndexes";

export function bracketsSiblingsValidator(expression: string): IError | undefined {
    const wrongOpenBracketSiblings = expression.match(regexPatterns.OPEN_BRACKETS_ADJACENT_SYMBOLS)
    const wrongClosedBracketSiblings = expression.match(regexPatterns.CLOSED_BRACKETS_ADJACENT_SYMBOLS)

    const errorIndexes: IErrorRange[] = []

    if (wrongOpenBracketSiblings) {
        errorIndexes.push(...getSubstringsIndexes(wrongOpenBracketSiblings, expression))
    }

    if (wrongClosedBracketSiblings) {
        errorIndexes.push(...getSubstringsIndexes(wrongClosedBracketSiblings, expression))
    }

    if (errorIndexes.length > 0) {
        return {
            message: ValidationError.BracketAdjacentCharactersError,
            payload: {
                errorPlace: errorIndexes
            }
        }
    }
}
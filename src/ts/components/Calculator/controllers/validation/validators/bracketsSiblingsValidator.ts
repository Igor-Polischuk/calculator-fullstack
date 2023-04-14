import { IValidationError } from "@components/Calculator/interfaces/ICalculator";
import { Error } from "../error";
import { regexPatterns } from "../../regex";
import { getSubstringsIndexes } from "../helpers/getSubstringsIndexes";
import { IErrorRange } from "@components/Calculator/interfaces/ICalculator";

export function bracketsSiblingsValidator(expression: string): IValidationError | undefined {
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
            message: Error.BracketAdjacentCharactersError,
            errorPlace: errorIndexes
        }
    }
}
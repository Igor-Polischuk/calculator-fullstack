
import { IError } from "@components/Calculator/interfaces/ICalculator";
import { regexPatterns } from "../../regex";
import { bracketsOrder } from "../bracketsOrder";
import { Error } from "../error";

export function bracketsValidator(expression: string): IError | undefined {
    const incorrectBracketIndex = bracketsOrder(expression)
    if (incorrectBracketIndex !== -1) {
        return {
            message: Error.BracketError,
            errorRange: [[incorrectBracketIndex, incorrectBracketIndex]]
        }
    }

    const wrongOpenBracketSiblings = expression.match(regexPatterns.OPEN_BRACKETS_ADJACENT_SYMBOLS)
    const wrongClosedBracketSiblings = expression.match(regexPatterns.CLOSED_BRACKETS_ADJACENT_SYMBOLS)

    if (wrongOpenBracketSiblings) return {
        message: Error.BracketAdjacentCharactersError,
        errorRange: [[wrongOpenBracketSiblings.index!, wrongOpenBracketSiblings.index!]]
    }

    if (wrongClosedBracketSiblings) return {
        message: Error.BracketAdjacentCharactersError,
        errorRange: [[wrongClosedBracketSiblings.index!, wrongClosedBracketSiblings.index!]]
    }
}
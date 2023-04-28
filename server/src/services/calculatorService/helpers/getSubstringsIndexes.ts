import { IErrorRange } from "../expressionValidation/ExpressionValidationError"
import { findSubstringIndexes } from "./findSubstringIndexes"

export function getSubstringsIndexes(substrings: string[], inputString: string): IErrorRange[] {
    return substrings.reduce<IErrorRange[]>((indexesAcc, invalidPart) => {
        const startSearchFrom = indexesAcc[indexesAcc.length - 1]?.to || 0
        const indexesOfCurrentParts = findSubstringIndexes(inputString, invalidPart, startSearchFrom)
        return [...indexesAcc, indexesOfCurrentParts]
    }, [])
}
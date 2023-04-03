import { findSubstringIndexes } from "@utilities/substring/findSubstringIndexes"

export function getSubstringsIndexes(substrings: string[], inputString: string){
    return substrings.reduce<{from: number, to: number}[]>((indexesAcc, invalidPart) => {
        const startSearchFrom = indexesAcc[indexesAcc.length - 1]?.to || 0
        const indexesOfCurrentParts = findSubstringIndexes(inputString, invalidPart, startSearchFrom)
        return [...indexesAcc, indexesOfCurrentParts]
    }, []) 
}
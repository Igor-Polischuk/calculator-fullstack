import { replaceByIndex } from "@utilities/formatText/replaceByIndex"
import { replaceString } from "@utilities/formatText/replaceString"

export function highlightErrorByIndex(expression: string, indices: number[]){
    const expressionWithIndexErrors = indices.reduce<string>((highlightedErrorsAcc, index) => {
        const errorIndexWrapper = `<span>${highlightedErrorsAcc[index]}</span>`
        return replaceByIndex({
            sourceString: highlightedErrorsAcc,
            index,
            replaceWith: errorIndexWrapper
        })
    }, expression)

    return expressionWithIndexErrors
}

export function highlightErrorByInvalidParts(expression: string, parts: string[]){
    const expressionWithInvalidParts = parts.reduce<string>((highlightedErrorsAcc, part) => {
        return replaceString({
            sourceString: highlightedErrorsAcc,
            targetString: `<span>${part}</span>`,
            replacementString: part
        })            
    }, expression)

    return expressionWithInvalidParts
}
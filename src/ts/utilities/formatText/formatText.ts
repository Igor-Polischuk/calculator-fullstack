interface IFormatFunction {
    [funcName: string]: (text: string) => string
}

export function formatText(text: string, formattedFunctions: IFormatFunction): string {
    const functionsNames = Object.keys(formattedFunctions)
    const formattedText = functionsNames.reduce<string>((formattedString, functionName) => {
        const currentFormatFunction = formattedFunctions[functionName]
        return currentFormatFunction(formattedString)
    }, text)

    return formattedText
}
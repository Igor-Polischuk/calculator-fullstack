interface IFormatFunction {
    [funcName: string]: (text: string) => string
}

export function formatText(text: string, formatedFunctions: IFormatFunction) {
    const functionsNames = Object.keys(formatedFunctions)
    const formatedText = functionsNames.reduce<string>((formatedString, functionName) => {
        const currentFormatFunction = formatedFunctions[functionName]
        return currentFormatFunction(formatedString)
    }, text)

    return formatedText
}
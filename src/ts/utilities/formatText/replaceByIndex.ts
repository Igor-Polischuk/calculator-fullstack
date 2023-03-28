type options = {
    sourceString: string,
    index: number
    replaceWith: string
}

export function replaceByIndex({index, replaceWith, sourceString}: options) {
    return sourceString.substring(0, index) + replaceWith + sourceString.substring(index + 1);
}
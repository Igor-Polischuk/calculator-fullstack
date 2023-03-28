type options = {
    sourceString: string,
    targetString: string,
    replacementString: string
}

const SPECIAL_SYMBOLS_REG = /[.*+?^${}()|[\]\\]/g

export function replaceString({ sourceString, targetString, replacementString }: options): string {
    const escapedSubstring = replacementString.replace(SPECIAL_SYMBOLS_REG, '\\$&');//escape special characters
    const regex = new RegExp(escapedSubstring, 'g');
    return sourceString.replace(regex, targetString);
}
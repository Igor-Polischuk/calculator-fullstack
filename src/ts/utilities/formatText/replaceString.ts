type options = {
    sourceString: string,
    targetString: string,
    replacementString: string
}

export function replaceString({sourceString, targetString, replacementString}: options): string {
    const escapedSubstring = replacementString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedSubstring, 'g');
    return sourceString.replace(regex, targetString);
}
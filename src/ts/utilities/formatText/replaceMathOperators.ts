const FIND_POWER = /(\^(\d+|π|\([^()]*\)))/g

const REPLACEMENTS: Record<string, string> = {
    '*': '×',
    '/': '÷',
    '-': '−',
    'pi': 'π',
    'sqrt': '√',
}

const REPLACEMENT_REG_STRING = Object.keys(REPLACEMENTS).map(operation => {
    if (operation.length === 1) {
        return `\\${operation}`
    }
    return operation
}).join('|')


export function replaceMathOperators(expression: string) {
    const regex = new RegExp(`${REPLACEMENT_REG_STRING}`, 'g');
    return expression.replace(regex, (match) => REPLACEMENTS[match])
        .replace(FIND_POWER, "<sup>$2</sup>")
}
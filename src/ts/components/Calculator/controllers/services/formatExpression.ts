import { formatText, removeSpaces } from '@utilities/formatText';

export function formatExpression(expression: string){
    const formatedExpression = formatText(expression, {
        removeSpaces
    })

    return formatedExpression
}

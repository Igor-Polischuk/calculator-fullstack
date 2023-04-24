import { regexPatterns } from './../../regex';

export function getMostNestedBrackets(expression: string): string[] {
    return expression.match(regexPatterns.MOST_NESTED_BRACKET) || []
}

import { regexPatterns } from "../regex"

export function getNumbersFromExpression(str: string): number[] {
    const numbersInString = str.match(regexPatterns.NUMBERS)
    return numbersInString?.map(number => +number) || []
}
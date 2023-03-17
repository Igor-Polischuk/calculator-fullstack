import { getNumberReg } from "./regExpressions"

export function getNumbersFromString(str: string): number[] {
    const numbersInString= str.match(getNumberReg())
    return numbersInString?.map(number => +number) ?? []
}
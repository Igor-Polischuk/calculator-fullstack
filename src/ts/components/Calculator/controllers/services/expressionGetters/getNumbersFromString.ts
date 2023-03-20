import { getNumberReg } from "../regularExp/regExpressions"

export function getNumbersFromString(str: string): number[] {
    const numbersInString= str.match(getNumberReg())
    return numbersInString?.map(number => +number) ?? []
}
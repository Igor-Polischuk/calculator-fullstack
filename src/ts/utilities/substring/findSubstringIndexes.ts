import { IErrorRange } from "exceptions/IErrors"

export function findSubstringIndexes(str: string, substr: string, startIndex = 0): IErrorRange {
  const index = str.indexOf(substr, startIndex)
  return { from: index, to: index + substr.length - 1 }
}
import { IErrorRange } from "@utils/AppErrors/ExpressionValidationError"

export function findSubstringIndexes(str: string, substr: string, startIndex = 0): IErrorRange | null {
  const index = str.indexOf(substr, startIndex)

  if (index === -1) {
    return null
  }

  return { from: index, to: index + substr.length - 1 }
}
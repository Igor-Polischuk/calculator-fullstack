export function findSubstringIndexes(str: string, substr: string, startIndex = 0): { from: number; to: number; } {
  const index = str.indexOf(substr, startIndex)
  return  { from: index, to: index + substr.length - 1 }
}
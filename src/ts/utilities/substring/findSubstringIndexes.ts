export function findSubstringIndexes(str: string, substr: string): { from: number; to: number; }[] {
  const reducer = (substringIndexesAcc: { from: number; to: number; }[], index: number): { from: number; to: number; }[] => {
    if (index === -1){
      return substringIndexesAcc
    }

    const substringIndexes= { from: index, to: index + substr.length - 1 }
    const indexOfSubstring = str.indexOf(substr, index + 1)
    return reducer([...substringIndexesAcc, substringIndexes], indexOfSubstring)
  }

  return reducer([], str.indexOf(substr));
}
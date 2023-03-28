export function findSubstringIndexes(str: string, substr: string): [number, number][] {
    const indexes: [number, number][] = [];
    let index = str.indexOf(substr);
    while (index !== -1) {
      indexes.push([index, index + substr.length - 1]);
      index = str.indexOf(substr, index + 1);
    }
    return indexes;
  }
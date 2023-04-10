import { IErrorRange } from "@components/Calculator/interfaces/ICalculator";

export function mergeRanges(ranges: IErrorRange[]): IErrorRange[] {
  if (ranges.length < 2) {
    return ranges;
  }
  const sortedRanges = [...ranges].sort((a, b) => a.from - b.from)
  const mergedRanges: { from: number, to: number }[] = sortedRanges.reduce((acc, currentRange) => {
    const previousRange = acc[acc.length - 1]

    if (currentRange.from <= previousRange.to) {
      previousRange.to = Math.max(previousRange.to, currentRange.to)
    } else {
      return [...acc, currentRange]
    }

    return acc;
  }, [sortedRanges[0]]);

  return mergedRanges;
}
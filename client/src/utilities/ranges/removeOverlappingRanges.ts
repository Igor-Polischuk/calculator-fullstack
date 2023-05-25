import { IErrorRange } from "common/AppError/IAppError";

export function removeOverlappingRanges(ranges: IErrorRange[]): IErrorRange[] {
  if (ranges.length < 2) {
    return ranges
  }
  const sortedRanges = [...ranges].sort((a, b) => a.from - b.from)
  const mergedRanges: IErrorRange[] = sortedRanges.reduce((mergedRanges, currentRange) => {
    const previousRange = mergedRanges[mergedRanges.length - 1]

    if (currentRange.from <= previousRange.to) {
      previousRange.to = Math.max(previousRange.to, currentRange.to)
    } else {
      return [...mergedRanges, currentRange]
    }

    return mergedRanges;
  }, [sortedRanges[0]]);

  return mergedRanges
}
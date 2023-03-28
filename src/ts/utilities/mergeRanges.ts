export function mergeRanges(ranges: [number, number][]): [number, number][] {
    if (ranges.length < 2) {
        return ranges;
    }
    const sortedRanges = [...ranges].sort((a, b) => a[0] - b[0])
    const mergedRanges: [number, number][] = sortedRanges.reduce((acc, currentRange) => {
        const previousRange = acc[acc.length - 1]

        if (currentRange[0] <= previousRange[1]) {
          previousRange[1] = Math.max(previousRange[1], currentRange[1])
        } else {
            return [...acc, currentRange]
        }

        return acc;
      }, [sortedRanges[0]]);
      
      return mergedRanges;
}
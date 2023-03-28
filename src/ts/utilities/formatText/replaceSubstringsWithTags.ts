export function replaceSubstringsWithTags(str: string, indices: [number, number][], tag: string): string {
    const { result } = indices.reduce(
      ({ result, offset }, [start, end]) => {
        const openTag = `<${tag}>`;
        const closeTag = `</${tag}>`;
        const replacement = openTag + str.slice(start, end + 1) + closeTag;
        return {
          result: result.slice(0, start + offset) + replacement + result.slice(end + 1 + offset),
          offset: offset + replacement.length - (end - start + 1),
        };
      },
      { result: str, offset: 0 }
    );
  
    return result;
  }
export function cutText(text: string, maxSize: number): string {
    if (text.length <= maxSize) {
        return text;
    }

    const ellipsis = '...';
    const cutIndex = text.length - maxSize;
    const cutText = text.slice(cutIndex, text.length);

    return ellipsis + cutText;
}
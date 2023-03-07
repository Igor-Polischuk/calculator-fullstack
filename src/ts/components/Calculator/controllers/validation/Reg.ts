export const Reg = {
    ActionInRow: /[+\-/*^]{2,}(?!--)/,
    CorrectLineEnd: /[\d)]$/,
    CorrectLineStart: /^[\d\w+\-(]+/,
    DoublePointInNumber: /\d+(\.\d+){2,}/,
    AllWords: /[a-zA-Z]+/g,
    ZeroDivision: /\/0+(?!\.\d)/,
    OpenBracketsAdjacentSymbols: /[\d]\(|\([\+\*\/\^]/,
    ClosenBracketsAdjacentSymbols: /[^\d\)]\)|\)[\d\w]/,
}
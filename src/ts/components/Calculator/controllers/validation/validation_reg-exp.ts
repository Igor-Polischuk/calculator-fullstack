export const Reg = {
    DoublePointInNumber: /\d+(\.\d+){2,}/,
    AllWords: /[a-zA-Z]+/g,
    ZeroDivision: /\/0+(?!\.\d)/,
    OpenBracketsAdjacentSymbols: /[\d]\(|\([\+\*\/\^]/,
    ClosenBracketsAdjacentSymbols: /[^\d\)\w\!]\)|\)[\d\w]/,
}
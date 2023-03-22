export const Reg = {
    ZeroDivision: /\/0+(?!\.\d)/,
    OpenBracketsAdjacentSymbols: /[\d]\(|\([\+\*\/\^]/,
    ClosedBracketsAdjacentSymbols: /[^\d\)\w\!]\)|\)[\d\w]/,
}
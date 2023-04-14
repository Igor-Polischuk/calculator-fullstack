export enum Error {
    BracketError = 'unexpected bracket',
    BracketAdjacentCharactersError = 'adjacent characters are not correct',
    ZeroDivisionError = 'division by Zero',
    NumberPointError = 'number with several points',
    OperationsInRowError = 'several operations are entered in a row',
    PointError = 'point in incorrect place',
    UnknownSymbol = 'unexpected character',
    IncorrectFunctionNameError = 'incorrect function name',
    LineStartError = 'incorrect start of expression',
    LineEndError = 'incorrect end of expression',
}
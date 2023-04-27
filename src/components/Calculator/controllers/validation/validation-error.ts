export enum ValidationError {
    ClosedBracketError = 'unexpected closing bracket',
    OpenBracketError = 'unexpected open bracket',
    BracketAdjacentCharactersError = 'incorrect characters near brackets',
    ZeroDivisionError = 'division by Zero',
    NumberPointError = 'number with several points',
    OperationsInRowError = 'several operations are entered in a row',
    PointError = 'point in incorrect place',
    UnknownSymbolError = 'unexpected character',
    IncorrectFunctionNameError = 'incorrect function name',
    LineStartError = 'incorrect start of expression',
    LineEndError = 'incorrect end of expression',
    IncorrectFunctionArgumentError = 'incorrect function argument'
}
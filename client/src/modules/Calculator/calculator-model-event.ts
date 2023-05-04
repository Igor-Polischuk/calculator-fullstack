export enum CalculatorModelEvent {
    ResultChanged = 'result',
    ExpressionChanged = 'expression',
    ErrorChanged = 'error',
    FetchedResult = 'isFetchingResult',
    LoadingData = 'loadingData',
    HistoryChanged = 'history',
    ButtonsDataGenerated = 'buttons'
}
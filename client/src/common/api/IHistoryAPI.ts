export type IHistoryItem = {
    expression: string;
    result: number;
}

export type IHistoryFormat = {
    items: IHistoryItem[],
    total: number
};
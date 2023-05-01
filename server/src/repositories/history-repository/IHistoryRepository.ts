export interface IDBItem {
    expression: string,
    result: number
}

export interface IHistoryRepository {
    setItem: (item: IDBItem) => Promise<void>
    getItem: (expression: string) => Promise<IDBItem | null>
    getAll: () => Promise<IDBItem[]>
}
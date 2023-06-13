export interface IBaseFields {
    id: number
}

export interface IGetItemParams<DataType> {
    field: keyof DataType
    value: unknown
}

export type DataTypeExtended<DataType> = DataType & IBaseFields;

export interface IDataBase<DataType> {
    getLength(): Promise<number>
    getAll(): Promise<DataTypeExtended<DataType>[]>
    count(count: number): Promise<DataTypeExtended<DataType>[]>
    pop(): Promise<void>
    removeLast(): Promise<void>
    setItem(item: DataType): Promise<void>
    deleteItem(params: IGetItemParams<DataType>): Promise<void>
    getItem(params: IGetItemParams<DataType>): Promise<DataType | null>
}
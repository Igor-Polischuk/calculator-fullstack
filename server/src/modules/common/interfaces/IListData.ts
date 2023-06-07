export interface IListDataResponseParams<ItemsType> {
    items: ItemsType[]
    total: number
    offset?: number
}
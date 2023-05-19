interface IListDataResponseParams {
    items: any
    total: number
    offset?: number
}

export class ListDataResponse {
    private items
    private total
    constructor(params: IListDataResponseParams) {
        this.items = params.items
        this.total = params.total
    }

}
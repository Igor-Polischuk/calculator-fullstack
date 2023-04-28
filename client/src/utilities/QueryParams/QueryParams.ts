type QueryParamsType = Record<string, string | number>

export class QueryParams {
    readonly params: QueryParamsType
    constructor(params: QueryParamsType) {
        this.params = params
    }

    toString(): string {
        const params = Object.keys(this.params)
        const queryString = params.reduce<string>((queryAcc, param, i) => {
            const separator = i === param.length - 1 ? '' : '&'
            return `${queryAcc}${param}=${encodeURIComponent(this.params[param])}${separator}`
        }, '?')

        return queryString
    }
}
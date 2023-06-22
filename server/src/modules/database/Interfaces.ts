export interface ITableFields {
    name: string
    type: string
    constraints?: string[]
}

export type Model = ITableFields[]
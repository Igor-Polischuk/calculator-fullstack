type priorityKeys = 'Constant' | 'Hight' | 'Medium' | 'Low'

type priority = Record<priorityKeys, number>

export const Priority: priority = {
    Constant: 3,
    Hight: 2,
    Medium: 1,
    Low: 0,
}

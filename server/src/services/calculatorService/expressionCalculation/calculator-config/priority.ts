type PriorityKeys = 'Constant' | 'Hight' | 'Medium' | 'Low'

type Priority = Record<PriorityKeys, number>

export const Priority: Priority = {
    Constant: 3,
    Hight: 2,
    Medium: 1,
    Low: 0,
}

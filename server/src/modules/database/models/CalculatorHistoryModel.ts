import { Model } from "../Interfaces";

export const calculatorHistoryModel: Model = [
    { name: 'expression', type: 'TEXT', constraints: ['NOT NULL'] },
    { name: 'result', type: 'FLOAT', constraints: ['NOT NULL'] }
]
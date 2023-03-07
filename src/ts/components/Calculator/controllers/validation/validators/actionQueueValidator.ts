import { Error } from "../error"
import { Reg } from "../Reg"

export function actio0nQueueValidator(expression: string) {
    const actionsInRow = expression.match(Reg.ActionInRow)
    if (actionsInRow) {
        return {
            message: Error.IncorectActionQueueError,
            where: actionsInRow?.index
        }
    }
}
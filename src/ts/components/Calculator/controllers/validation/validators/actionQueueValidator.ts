import { Error } from "../error"
import { Reg } from "../validation_reg-exp"

export function actio0nQueueValidator(expression: string) {
    const actionsInRow = expression.match(Reg.ActionInRow)
    if (actionsInRow) {
        return {
            message: Error.IncorectActionQueueError,
            meta: {
                errorIndex: actionsInRow?.index
            }
        }
    }
}
import { Error } from "../error";
import { Reg } from "../Reg";

export function expressionEndValidator(expression: string){
        if (!Reg.CorrectLineEnd.test(expression)) return {
            message: Error.LineEndtError,
            meta: {
                errorIndex: expression.length - 1,
                description: `an expression cannot end with ${expression[expression.length - 1]}`
            }
        }
}
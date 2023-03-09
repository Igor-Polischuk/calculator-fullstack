import { Error } from "../error";
import { Reg } from "../Reg";

export function expressionEndValidator(expression: string){
        if (!Reg.CorrectLineEnd.test(expression)) return {
            message: Error.LineEndtError,
            where: expression.length - 1
        }
}
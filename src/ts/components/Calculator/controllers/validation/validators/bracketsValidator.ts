import { Reg } from '../validation_reg-exp';
import { Error } from "../error";

export function bracketsValidator(expression: string) {
    const stack = [];
    for (let i = 0; i < expression.length; i++) {
        const char = expression[i];
        if (char === "(") {
            stack.push(i);
        } else if (char === ")") {
            if (stack.length === 0) {
                return {
                    message: Error.UnexpectedClosingBracketError,
                    meta: {
                        errorIndex: i
                    }
                }
            }
            stack.pop();
        }
    }
    
    if (stack.length !== 0) {
        return {
            message: Error.UnclosedBracketError,
            meta: {
                errorIndex: expression.lastIndexOf('(')
            }
        }
    }

    const wrongOpenBracketSiblings = expression.match(Reg.OpenBracketsAdjacentSymbols)
    const wrongClosedBracketSiblings = expression.match(Reg.ClosedBracketsAdjacentSymbols)
    
    if (wrongOpenBracketSiblings) return {
        message: Error.BracketAdjacentCharactersError,
        meta: {
            errorIndex: wrongOpenBracketSiblings.index
        }
    }

    if (wrongClosedBracketSiblings) return {
        message: Error.BracketAdjacentCharactersError,
        meta: {
            errorIndex: wrongClosedBracketSiblings.index
        }
    }
}
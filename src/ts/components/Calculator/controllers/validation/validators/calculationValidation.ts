import { calculatorConfig } from "../../config/calculator-config";
import { getOperationsFromExpression, unwrapBracketInExpression } from "../../services";
import { IError } from "@components/Calculator/interfaces/ICalculator"

export function calculationValidation(expression: string): IError | undefined {
    if(Number(expression)){
        return
    }

    
    const expressionWithoutBrackets = unwrapBracketInExpression(expression)
    const expressionOperators = getOperationsFromExpression(expressionWithoutBrackets);
    console.log(expressionOperators);
    
    const functionActions = expressionOperators.filter(operation => operation.length > 1).reverse()
    const binaryAcrions = expressionOperators.filter(operation => operation.length === 1)

    const checkedFunctionsActions = replaceActionToZero(expressionWithoutBrackets, functionActions)
    const checkedBinaryActions = replaceActionToZero(checkedFunctionsActions, binaryAcrions)

    if (checkedBinaryActions == '0') {
        return undefined
    }

    return {
        message: 'unresolved expression format',
        meta: {
            description: `wrong entry in: ${checkedBinaryActions.replace('0', '..')}`
        }
    }

}

function replaceActionToZero(expression: string, operations: string[]) {
    return operations.reduce<string>((resultAcc, operation) => {
        const currentOperationObj = calculatorConfig[operation];
        const matchedExpressionWithOperation: RegExpMatchArray | null = resultAcc.match(currentOperationObj.reg)
        if (!matchedExpressionWithOperation) {
            return resultAcc
        }
        return resultAcc.replace(matchedExpressionWithOperation[0], '0')
    }, expression)
}
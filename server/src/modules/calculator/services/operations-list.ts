import { allowedActions, calculatorConfig } from "./expressionCalculation/calculator-config"

interface IOperationsList {
    operationSymbol: string
    operation: string
}

export function getOperationsList(): IOperationsList[] {
    return allowedActions.reduce<IOperationsList[]>((operationsDataAcc, currentOperation) => {
        const operationData = calculatorConfig[currentOperation]
        const buttonText = {
            operationSymbol: operationData.text || currentOperation,
            operation: currentOperation
        }
        return [...operationsDataAcc, buttonText]
    }, [])
}
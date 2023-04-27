import { ButtonType } from '../ButtonType';
import { Button } from "@components/Elements/Button"
import { allowedActions, calculatorConfig } from "@components/Calculator/controllers/calculator-config"

interface IButtonDataReducer {
    text: string
    action: string
}

export function getOperationsButtons(): Record<string, Button> {
    const operationsData = generateButtonsData()

    return operationsData.reduce<Record<string, Button>>((buttonsObj, operation) => {
        buttonsObj[operation.action] = new Button({
            text: operation.text,
            classNames: 'button button--action',
            type: ButtonType.Char,
            data: {
                action: operation.action
            }
        })
        return { ...buttonsObj }
    }, {})
}

function generateButtonsData(): IButtonDataReducer[] {
    return allowedActions.reduce<IButtonDataReducer[]>((buttonDataAcc, currentOperation) => {
        const operationData = calculatorConfig[currentOperation]
        const buttonText = {
            text: operationData.text || currentOperation,
            action: currentOperation
        }
        return [...buttonDataAcc, buttonText]
    }, [])
}
import { ButtonRole } from './ButtonRole';
import { Button } from "@components/Elements/Button"
import { allowedActions, calculatorConfig } from "@components/Calculator/controllers/config/calculator-config"

export function getOperationsButtons() {
    const operationsData = generateButtonsData()

    return operationsData.reduce<Record<string, Button>>((buttonsObj, operation) => {
        buttonsObj[operation.action] = new Button({
            text: operation.text,
            classNames: 'button button--action',
            role: ButtonRole.GET_VALUES,
            data: {
                action: operation.action
            }
        })
        return { ...buttonsObj }
    }, {})
}

function generateButtonsData() {
    return allowedActions.reduce<{ text: string, action: string }[]>((acc, currentOperation) => {
        const operationData = calculatorConfig[currentOperation]
        const buttonText = {
            text: operationData.text || currentOperation,
            action: currentOperation
        }
        return [...acc, buttonText]
    }, [])
}
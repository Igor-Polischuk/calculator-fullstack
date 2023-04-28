import { callCalculatorApi } from 'api/callCalculatorApi';
import { ButtonType } from '../ButtonType';
import { Button } from "@components/Elements/Button"
import { ApiEndpoint } from 'api/api-endpoint';

interface IOperationsData {
    operation: string
    operationSymbol: string
}

export async function getOperationsButtons(): Promise<Record<string, Button>> {
    const response = await callCalculatorApi<IOperationsData[]>({ endpoint: ApiEndpoint.Operations })

    if (!response.data) {
        return {}
    }

    const buttons = response.data.reduce<Record<string, Button>>((buttonsObj, operation) => {
        buttonsObj[operation.operation] = new Button({
            text: operation.operationSymbol,
            classNames: 'button button--action',
            type: ButtonType.Char,
            data: {
                action: operation.operation
            }
        })

        return { ...buttonsObj }
    }, {})

    return buttons
}
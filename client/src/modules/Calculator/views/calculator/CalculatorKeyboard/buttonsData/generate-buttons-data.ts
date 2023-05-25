import { ButtonType } from "@modules/Calculator/interfaces/ButtonType"
import { IOperation, IOperationsData } from "@modules/Calculator/interfaces/ICalculatorAPI"

export interface IButtonData {
    classNames: string
    type: ButtonType
    text: string
    value?: string
}

const ACTION_BUTTON_CLASS_NAME = 'button button--action'
const NUMBER_BUTTON_CLASS_NAME = 'button button--number'
const GET_RESULT_BUTTON_CLASS_NAME = 'button button--get-res'

export function generateButtonsData(fetchedButtonData: IOperation[]): IButtonData[] {
    const { resultBtn, removeSymbolBtn, clearBtn } = getServiceButtons()
    const numpadButtonsData = getNumpadButtons()
    const operationsButton = getOperationsButtonData(fetchedButtonData)

    const row1 = [operationsButton['pi'], operationsButton['e'],
    numpadButtonsData[11], numpadButtonsData[12],
        removeSymbolBtn, clearBtn]

    const row2 = [operationsButton['sin'], operationsButton['sqrt'],
    numpadButtonsData[7], numpadButtonsData[8],
    numpadButtonsData[9], operationsButton['/']]

    const row3 = [operationsButton['cos'], operationsButton['^'],
    numpadButtonsData[4], numpadButtonsData[5],
    numpadButtonsData[6], operationsButton['*']]

    const row4 = [operationsButton['tg'], operationsButton['!'],
    numpadButtonsData[1], numpadButtonsData[2],
    numpadButtonsData[3], operationsButton['-']]

    const row5 = [operationsButton['ctg'], operationsButton['%'],
    numpadButtonsData[0], numpadButtonsData[10],
        resultBtn, operationsButton['+']]

    return [
        ...row1,
        ...row2,
        ...row3,
        ...row4,
        ...row5,
    ].filter(button => !!button)

}


function getNumpadButtons(): IButtonData[] {
    const numpadButtonsText = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '(', ')']

    return numpadButtonsText.map(value => {
        return {
            classNames: (value === ')' || value === '(') ? ACTION_BUTTON_CLASS_NAME : NUMBER_BUTTON_CLASS_NAME,
            text: value,
            type: ButtonType.Char,
            value
        }
    })
}

function getOperationsButtonData(fetchedButtonData: IOperation[]): Record<string, IButtonData> {
    const buttons = fetchedButtonData.reduce<Record<string, IButtonData>>((buttonsObj, operation) => {
        buttonsObj[operation.operation] = {
            text: operation.operationSymbol,
            classNames: ACTION_BUTTON_CLASS_NAME,
            type: ButtonType.Char,
            value: operation.operation
        }

        return { ...buttonsObj }
    }, {})

    return buttons
}

function getServiceButtons(): Record<string, IButtonData> {
    const clearBtn = {
        text: 'AC',
        type: ButtonType.Clear,
        classNames: ACTION_BUTTON_CLASS_NAME,
    }

    const removeSymbolBtn = {
        text: '←',
        type: ButtonType.Backspace,
        classNames: ACTION_BUTTON_CLASS_NAME,
    }
    const resultBtn = {
        text: '=',
        type: ButtonType.Equal,
        classNames: GET_RESULT_BUTTON_CLASS_NAME,
    }
    return { resultBtn, removeSymbolBtn, clearBtn }
}
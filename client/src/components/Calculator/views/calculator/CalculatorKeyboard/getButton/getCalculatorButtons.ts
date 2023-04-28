import { ButtonType } from './../ButtonType';
import { ButtonList } from '@components/Calculator/views/calculator/CalculatorKeyboard/ButtonList';
import { getNumpadButtons } from "./getNumpadButtons"
import { getOperationsButtons } from "./getOperationsButtons"
import { getServiceButtons } from "./getServiceButtons"


export async function getCalculatorButtons(): Promise<ButtonList<ButtonType>> {
    const numpadButtons = getNumpadButtons()
    const operationsButton = await getOperationsButtons()
    const { resultBtn, removeSymbolBtn, clearBtn } = getServiceButtons()

    const row1 = [operationsButton['pi'], operationsButton['e'], numpadButtons[11], numpadButtons[12], removeSymbolBtn, clearBtn]
    const row2 = [operationsButton['sin'], operationsButton['sqrt'], numpadButtons[7], numpadButtons[8], numpadButtons[9], operationsButton['/']]
    const row3 = [operationsButton['cos'], operationsButton['^'], numpadButtons[4], numpadButtons[5], numpadButtons[6], operationsButton['*']]
    const row4 = [operationsButton['tg'], operationsButton['!'], numpadButtons[1], numpadButtons[2], numpadButtons[3], operationsButton['-']]
    const row5 = [operationsButton['ctg'], operationsButton['%'], numpadButtons[0], numpadButtons[10], resultBtn, operationsButton['+']]

    return new ButtonList<ButtonType>([
        ...row1,
        ...row2,
        ...row3,
        ...row4,
        ...row5,
    ])
}
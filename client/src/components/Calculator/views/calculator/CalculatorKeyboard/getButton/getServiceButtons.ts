import { ButtonType } from '../ButtonType';
import { Button } from "@components/Elements/Button"

const ACTION_BUTTON_CLASS_NAME = 'button button--action'
const GET_RESULT_BUTTON_CLASS_NAME = 'button button--get-res'

export function getServiceButtons(): Record<string, Button> {
    const clearBtn = new Button({
        text: 'AC',
        type: ButtonType.Clear,
        classNames: ACTION_BUTTON_CLASS_NAME,
    })

    const removeSymbolBtn = new Button({
        text: '←',
        type: ButtonType.Backspace,
        classNames: ACTION_BUTTON_CLASS_NAME,
    })
    const resultBtn = new Button({
        text: '=',
        type: ButtonType.Equal,
        classNames: GET_RESULT_BUTTON_CLASS_NAME,
    })
    return { resultBtn, removeSymbolBtn, clearBtn }
}
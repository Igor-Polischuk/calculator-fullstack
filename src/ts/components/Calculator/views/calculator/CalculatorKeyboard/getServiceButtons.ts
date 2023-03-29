import { ButtonRole } from './ButtonRole';
import { Button } from "@components/Elements/Button"

const ACTION_BUTTON_CLASS_NAME = 'button button--action'
const GET_RESULT_BUTTON_CLASS_NAME = 'button button--get-res'

export function getServiceButtons() {
    const clearBtn = new Button({
        text: 'AC',
        role: ButtonRole.CLEAR_ALL,
        classNames: ACTION_BUTTON_CLASS_NAME,
    })

    const removeSymbolBtn = new Button({
        text: '←',
        role: ButtonRole.CLEAR_CHAR,
        classNames: ACTION_BUTTON_CLASS_NAME,
    })
    const resultBtn = new Button({
        text: '=',
        role: 'button button--get-res',
        classNames: GET_RESULT_BUTTON_CLASS_NAME ,
    })
    return { resultBtn, removeSymbolBtn, clearBtn }
}
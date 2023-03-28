import { ClassName } from './../ClassName';
import { ButtonRole } from './ButtonRole';
import { Button } from "@components/Elements/Button"

const ACTION_BUTTON_CLASS_NAME = 'button button--action'
const GET_RESULT_BUTTON_CLASS_NAME = 'button button--get-res'

export function getServiceButtons() {
    const clearBtn = new Button({
        text: 'AC',
        role: ButtonRole.CLEAR_ALL,
        classNames: ClassName.ACTION_BUTTON,
    })

    const removeSymbolBtn = new Button({
        text: '←',
        role: ButtonRole.CLEAR_CHAR,
        classNames: ClassName.ACTION_BUTTON,
    })
    const resultBtn = new Button({
        text: '=',
        role: ButtonRole.GET_RESULT,
        classNames: ClassName.GET_RESULT_BUTTON,
    })
    return { resultBtn, removeSymbolBtn, clearBtn }
}
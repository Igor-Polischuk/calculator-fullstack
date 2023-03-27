import { ButtonRole } from './buttonName';
import { Button } from "@components/Elements/Button"

export function getServiceButtons() {
    const clearBtn = new Button({
        text: 'AC',
        role: ButtonRole.CLEAR_ALL,
        classNames: 'button button--action',
    })

    const removeSymbolBtn = new Button({
        text: '←',
        role: ButtonRole.CLEAR_CHAR,
        classNames: 'button button--action',
    })
    const resultBtn = new Button({
        text: '=',
        role: ButtonRole.GET_RESULT,
        classNames: 'button button--get-res',
    })
    return { resultBtn, removeSymbolBtn, clearBtn }
}
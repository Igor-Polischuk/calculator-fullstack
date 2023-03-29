import { Button } from "@components/Elements/Button"
import { ButtonRole } from "./ButtonRole"

const ACTION_BUTTON_CLASS_NAME = 'button button--action'
const NUMBER_BUTTON_CLASS_NAME = 'button button--number'

export function getNumpadButtons() {
    const numpadButtonsText = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '(', ')']
    return numpadButtonsText.map(text => {
        return new Button({
            classNames: (text === ')' || text === '(') ? ACTION_BUTTON_CLASS_NAME :  NUMBER_BUTTON_CLASS_NAME,
            text,
            role: ButtonRole.GET_VALUES,
            data: {
                action: text
            }
        })
    })
}
import { Button } from "@components/Elements/Button"
import { ClassName } from "../ClassName"
import { ButtonRole } from "./ButtonRole"

export function getNumpadButtons() {
    const numpadButtonsText = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '(', ')']
    return numpadButtonsText.map(text => {
        return new Button({
            classNames: (text === ')' || text === '(') ? ClassName.ACTION_BUTTON :  ClassName.NUMBER_BUTTON,
            text,
            role: ButtonRole.GET_VALUES,
            data: {
                action: text
            }
        })
    })
}
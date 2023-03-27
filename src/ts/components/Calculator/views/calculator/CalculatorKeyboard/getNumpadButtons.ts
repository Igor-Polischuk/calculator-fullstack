import { Button } from "@components/Elements/Button"
import { ButtonRole } from "./buttonName"

export function getNumpadButtons() {
    const numpadButtonsText = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '(', ')']
    const numberClassNames = 'button button--number'
    const bracketsClassNames = 'button button--action'
    return numpadButtonsText.map(text => {
        return new Button({
            classNames: (text === ')' || text === '(') ? bracketsClassNames : numberClassNames,
            text,
            role: ButtonRole.GET_VALUES,
            data: {
                action: text
            }
        })
    })
}
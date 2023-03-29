import { ClassName } from './../ClassName';
import { ButtonList } from '@utilities/dataStructures/ButtonList';
import { DivElement } from '@components/Elements/DivElement';
import { getCalculatorButtons } from './getCalculatorButtons';
import { ButtonRole } from './ButtonRole';

interface ICalculatorKeyboardOption {
    onEqual: () => void
    onButtonClick: (clickedButtonValue: string) => void
    onBackspace: () => void
    onReset: () => void
}

export class CalculatorKeyboard {
    private keyboardWrapper: DivElement
    private buttons: ButtonList
    private params: ICalculatorKeyboardOption
    constructor(params: ICalculatorKeyboardOption) {
        this.params = params
        this.keyboardWrapper = new DivElement({ classNames: ClassName.CALCULATOR_KEYBOARD })
        this.buttons = getCalculatorButtons()
        this.keyboardWrapper.append(...this.buttons.getAll())
        this.initButtonsListeners()
    }

    get element() {
        return this.keyboardWrapper
    }

    private initButtonsListeners() {
        this.buttons.addClickListenersByRole(ButtonRole.GET_VALUES, ({ button }) => {
            this.params.onButtonClick(button.metaData.action)
        })

        this.buttons.addClickListenersByRole(ButtonRole.GET_RESULT, () => {
            this.params.onEqual()
        })

        this.buttons.addClickListenersByRole(ButtonRole.CLEAR_CHAR, () => {
            this.params.onBackspace()
        })

        this.buttons.addClickListenersByRole(ButtonRole.CLEAR_ALL, () => {
            this.params.onReset()
        })
    }
}
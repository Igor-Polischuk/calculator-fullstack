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
        this.keyboardWrapper = new DivElement({ classNames: 'calculator__keyboard' })
        this.buttons = getCalculatorButtons()
        this.keyboardWrapper.append(...this.buttons.getAll())
        this.initButtonsListeners()
    }

    get element() {
        return this.keyboardWrapper
    }

    private initButtonsListeners() {
        this.buttons.addClickListenersByType(ButtonRole.GET_VALUES, ({ button }) => {
            this.params.onButtonClick(button.metaData.action)
        })

        this.buttons.addClickListenersByType(ButtonRole.GET_RESULT, () => {
            this.params.onEqual()
        })

        this.buttons.addClickListenersByType(ButtonRole.CLEAR_CHAR, () => {
            this.params.onBackspace()
        })

        this.buttons.addClickListenersByType(ButtonRole.CLEAR_ALL, () => {
            this.params.onReset()
        })
    }
}
import { ButtonList } from '@utilities/dataStructures/ButtonList';
import { DivElement } from '@components/Elements/DivElement';
import { getCalculatorButtons } from './getButton/getCalculatorButtons';
import { ButtonType } from './ButtonType';

interface ICalculatorKeyboardOption {
    onEqual: () => void
    onButtonClick: (clickedButtonValue: string) => void
    onBackspace: () => void
    onReset: () => void
}

export class CalculatorKeyboard {
    private keyboardWrapper: DivElement
    private buttons: ButtonList<ButtonType>
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
        this.buttons.addClickListenersByType(ButtonType.Char, ({ button }) => {
            this.params.onButtonClick(button.metaData.action)
        })

        this.buttons.addClickListenersByType(ButtonType.Equal, () => {
            this.params.onEqual()
        })

        this.buttons.addClickListenersByType(ButtonType.Backspace, () => {
            this.params.onBackspace()
        })

        this.buttons.addClickListenersByType(ButtonType.Clear, () => {
            this.params.onReset()
        })
    }
}
import { ClassName } from './../ClassName';
import { ButtonList } from '@utilities/dataStructures/ButtonList';
import { DivElement } from '@components/Elements/DivElement';
import { getCalculatorButtons } from './getCalculatorButtons';
import { ButtonRole } from './ButtonRole';

interface ICalculatorKeyboardOption {
    onEqual: () => void
    setInputValue: (callback: (currentInputValue: string) => string) => void
}

export class CalculatorKeyboard {
    private keyboardWrapper: DivElement
    private buttons: ButtonList
    private options: ICalculatorKeyboardOption
    constructor(options: ICalculatorKeyboardOption) {
        this.options = options
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
            this.options.setInputValue(value => value + button.metaData.action)
        })

        this.buttons.addClickListenersByRole(ButtonRole.GET_RESULT, () => {
            this.options.onEqual()
        })

        this.buttons.addClickListenersByRole(ButtonRole.CLEAR_CHAR, () => {
            this.options.setInputValue((value) => value.slice(0, -1))
        })

        this.buttons.addClickListenersByRole(ButtonRole.CLEAR_ALL, () => {
            this.options.setInputValue(() => '')
        })
    }
}
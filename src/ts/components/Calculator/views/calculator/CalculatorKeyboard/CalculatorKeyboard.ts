import { ButtonList } from '@components/Calculator/views/calculator/CalculatorKeyboard/ButtonList';
import { getCalculatorButtons } from './getButton/getCalculatorButtons';
import { ButtonType } from './ButtonType';
import { WrapperElement } from '@components/Elements/ComplexElement';

interface ICalculatorKeyboardOption {
    onEqual: () => void
    onChar: (clickedButtonValue: string) => void
    onBackspace: () => void
    onReset: () => void
}

export class CalculatorKeyboard extends WrapperElement {
    private buttons: ButtonList<ButtonType>
    private params: ICalculatorKeyboardOption
    constructor(params: ICalculatorKeyboardOption) {
        super({
            wrapperClassNames: 'calculator__keyboard'
        })
        this.params = params
        this.buttons = getCalculatorButtons()
        this.wrapper.append(...this.buttons.getAll())
        this.initButtonsListeners()
    }

    private initButtonsListeners() {
        this.buttons.addClickListenersByType(ButtonType.Char, ({ button }) => {
            this.params.onChar(button.metaData.action)
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
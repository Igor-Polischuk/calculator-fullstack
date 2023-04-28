import { ButtonList } from '@components/Calculator/views/calculator/CalculatorKeyboard/ButtonList';
import { getCalculatorButtons } from './getButton/getCalculatorButtons';
import { ButtonType } from './ButtonType';
import { WrapperElement } from '@components/Elements/WrapperElement';
import { getLoader } from '@components/Loader';

interface ICalculatorKeyboardOption {
    onEqual: () => void
    onChar: (clickedButtonValue: string) => void
    onBackspace: () => void
    onReset: () => void
}

export class CalculatorKeyboard extends WrapperElement {
    private params: ICalculatorKeyboardOption
    private buttons: ButtonList<ButtonType> | null = null

    constructor(params: ICalculatorKeyboardOption) {
        super({
            wrapperClassNames: 'calculator__keyboard'
        })

        this.params = params
        this.addButtonsToWrapper()
    }

    private async addButtonsToWrapper() {
        this.wrapper.append(getLoader({ fullscreen: true }))

        this.buttons = await getCalculatorButtons()
        this.initButtonsListeners()
        this.wrapper.append(...this.buttons.getAll())

        this.wrapper.removeElement('#loader')
    }

    private initButtonsListeners(): void {
        if (!this.buttons) {
            return
        }

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
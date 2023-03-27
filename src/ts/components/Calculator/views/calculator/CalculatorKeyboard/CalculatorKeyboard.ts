import { Button } from '@components/Elements/Button';
import { DivElement } from '@components/Elements/DivElement';
import { getCalculatorButtons } from './getCalculatorButtons';

interface ICalculatorKeyboardOption {
    onEqual: () => void
    setInputValue: (callback: (currentInputValue: string) => string) => void
}

export class CalculatorKeyboard {
    private keyboard: DivElement
    private buttons: Button[]
    private options: ICalculatorKeyboardOption
    constructor(options: ICalculatorKeyboardOption) {
        this.options = options
        this.keyboard = new DivElement({ classNames: 'calculator__keyboard'})
        this.buttons = getCalculatorButtons()
        this.listenButtons()
        this.keyboard.append(...this.buttons)
    }

    get element() {
        return this.keyboard
    }

    private listenButtons() {
        this.buttons = getCalculatorButtons()

        const symbolsBtn = this.buttons.filter(button => button.metaData.hasOwnProperty('action'))
        this.attachButtonHandlers(symbolsBtn)

        const [resultBtn] = this.buttons.filter(button => button.metaData.purpose === 'getResult')

        const [removeSymbolBtn] = this.buttons.filter(button => button.metaData.purpose === 'removeSymbol')

        const [clearBtn] = this.buttons.filter(button => button.metaData.purpose === 'clearInput')

        resultBtn.onClick(() => {
            this.options.onEqual()
        })

        removeSymbolBtn.onClick(() => {
            this.options.setInputValue((value) => value.slice(0, -1))
        })

        clearBtn.onClick(() => {
            this.options.setInputValue(() => '')
        })
    }

    private attachButtonHandlers(buttons: Button[]) {
        buttons.forEach(numButton => {
            numButton.onClick(() => {
                this.options.setInputValue(value => value + numButton.metaData.action)
            })
        })
    }
}
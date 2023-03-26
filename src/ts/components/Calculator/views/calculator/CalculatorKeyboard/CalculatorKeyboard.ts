import { Button } from '@components/Elements/Button';
import { GridContainer } from '@components/Elements/GridContainer';
import { getCalculatorButtons } from './getCalculatorButtons';

interface ICalculatorKeyboardOption {
    onEqual: () => void
    onValueChange: (value: string) => void
}

export class CalculatorKeyboard {
    private keyboard: GridContainer
    private buttons: Button[]
    private keyboardValue: string
    private options: ICalculatorKeyboardOption
    constructor(options: ICalculatorKeyboardOption) {
        this.options = options
        this.keyboardValue = ''
        this.keyboard = new GridContainer({ columns: 6, gap: 10 })
        this.buttons = getCalculatorButtons()
        this.listenButtons()
        this.keyboard.append(...this.buttons)
    }

    get element() {
        return this.keyboard
    }

    get value() {
        return this.keyboardValue
    }

    setValue(value: string) {
        this.keyboardValue = value
        this.options.onValueChange(value)
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
            this.setValue(this.keyboardValue.slice(0, -1))
        })

        clearBtn.onClick(() => {

            this.setValue('')
        })
    }

    private attachButtonHandlers(buttons: Button[]) {
        buttons.forEach(numButton => {
            numButton.onClick(() => {
                const newInputValue = this.keyboardValue + numButton.metaData.action
                this.setValue(newInputValue)
            })
        })
    }
}
import { Button } from '@components/Elements/Button';
import { GridContainer } from '@components/Elements/GridContainer';
import { getCalculatorButtons } from './getCalculatorButtons';


export class CalculatorKeyboard{
    private keyboard = new GridContainer({ columns: 6, gap: 10 })
    private buttons = getCalculatorButtons()

    private keyboardValue = ''
    private resultHandlerBTN
    private keyboardValueHandler: (value: string) => void
    constructor(
        config: {
            resultBtnHandler: () => void,
            keyboardValueHandler: (value: string) => void

        }
    ) {
        this.resultHandlerBTN = config.resultBtnHandler
        this.keyboardValueHandler = config.keyboardValueHandler

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
        this.keyboardValueHandler(value)
    }

    private listenButtons() {
        this.buttons = getCalculatorButtons()
        const symbolsBtn = this.buttons.filter(button => button.metaData.hasOwnProperty('action'))
        this.attachButtonHandlers(symbolsBtn)
        const [resultBtn] = this.buttons.filter(button => button.metaData.purpose === 'getResult')
        const [removeSymbolBtn] = this.buttons.filter(button => button.metaData.purpose === 'removeSymbol')
        const [clearBtn] = this.buttons.filter(button => button.metaData.purpose === 'clearInput')

        resultBtn.onClick(() => {
            this.resultHandlerBTN()
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
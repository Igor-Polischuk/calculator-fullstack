import { ButtonList } from '@modules/Calculator/views/calculator/CalculatorKeyboard/ButtonList';
import { Button } from '@modules/Elements/Button';
import { ButtonType } from '@modules/Calculator/interfaces/ButtonType';
import { DivElement } from '@modules/Elements/DivElement';
import { generateButtonsData } from './buttonsData/generate-buttons-data';
import { IOperationsData } from '@modules/Calculator/interfaces/ICalculatorAPI';

interface ICalculatorKeyboardOption {
    buttonsData: IOperationsData[]
    onEqual: () => void
    onChar: (clickedButtonValue: string) => void
    onBackspace: () => void
    onReset: () => void
}

export class CalculatorKeyboard extends DivElement {
    private params: ICalculatorKeyboardOption
    private buttons: ButtonList<ButtonType>

    constructor(params: ICalculatorKeyboardOption) {
        super({
            classNames: 'calculator__keyboard'
        })

        const buttons = this.createButtons(params.buttonsData)

        this.params = params
        this.buttons = new ButtonList<ButtonType>(buttons)

        this.append(...buttons)
        this.initButtonsListeners()
    }

    toggleKeyboardActivation(isDisabled: boolean): void {
        this.buttons.getAll().forEach(button => {
            button.domElement.disabled = isDisabled
        })
    }


    private createButtons(operationsData: IOperationsData[]): Button[] {
        const buttonsData = generateButtonsData(operationsData)

        const buttons = buttonsData.map(({ text, classNames, type, value }) => {
            return new Button({
                text,
                classNames,
                type,
                value
            })
        })

        return buttons
    }



    private initButtonsListeners(): void {
        this.buttons.addClickListenersByType(ButtonType.Char, ({ button }) => {
            this.params.onChar(button.value || '')
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
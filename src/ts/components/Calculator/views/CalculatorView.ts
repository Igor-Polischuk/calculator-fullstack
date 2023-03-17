import { BlockElement } from './../../Elements/BlockElement';
import { Button } from '../../Elements/Button';
import { IError } from '../interfaces/ICalculator';
import { ICalculatorModel, ICalculatorView } from "@components/Calculator/interfaces/ICalculator";
import { CalculatorObserverEvent } from "../calculator-event";
import { getMathInput } from './getMathInput';
import { getCalculatorButtons } from './getCalculatorButtons';
import { GridContainer } from '@components/Elements/GridContainer';

export class CalculatorView implements ICalculatorView {
    private mathInput = getMathInput()
    private resultBlock = new BlockElement({ classNames: ['calculator__result'] })
    private buttons: Button[] = []

    constructor(private model: ICalculatorModel) {
        model.subscribe(CalculatorObserverEvent.Result, this.renderResult.bind(this))
        model.subscribe(CalculatorObserverEvent.Error, this.renderError.bind(this))

        this.conectButtons()
        this.renderHTML()
        this.mathInput.domEl.focus()
    }

    private renderResult(newResult: number) {
        this.resultBlock.domEl.classList.add('visible')
        const formatedExpression = this.formatExpression(this.mathInput.value)
        this.resultBlock.domEl.innerHTML = `<p class='showup'>${formatedExpression} = <b>${newResult}</b></p>`
        this.mathInput.value = newResult.toString()
    }

    private renderError(error: IError[]) {
        this.resultBlock.domEl.classList.add('visible')
        const errorIndices = error.map(err => err.meta.errorIndex!)
        const onlyMessegeErrors = error.filter(error => !error.meta.errorIndex )
        const errorString = this.mathInput.value.split('').reduce<string>((errAcc, char, i) => {
            return errAcc + ((errorIndices.includes(i)) ? `<span class='error'>${char}</span>` : char)
        }, '')
        this.resultBlock.domEl.innerHTML = onlyMessegeErrors.length > 0 
        ?  `<span class='error'>${onlyMessegeErrors[0].message}</span>`
        : errorString
    }

    private conectButtons() {
        this.buttons = getCalculatorButtons()
        const symbolsBtn = this.buttons.filter(button => button.metaData.hasOwnProperty('action'))
        this.attachButtonHandlers(symbolsBtn)
        const [resultBtn] = this.buttons.filter(button => button.metaData.purpose === 'getResult')
        const [removeSymbolBtn] = this.buttons.filter(button => button.metaData.purpose === 'removeSymbol')
        const [clearBtn] = this.buttons.filter(button => button.metaData.purpose === 'clearInput')

        resultBtn.onClick(() => {
            if (this.mathInput.value.trim().length === 0) return
            this.model.setExpression(this.mathInput.value)
        })

        removeSymbolBtn.onClick(() => {
            this.mathInput.value = this.mathInput.value.slice(0, -1)
        })

        clearBtn.onClick(() => {
            this.mathInput.value = ''
        })
    }

    private attachButtonHandlers(btns: Button[]) {
        btns.forEach(numButton => {
            numButton.onClick(() => {
                const newInputValue = this.mathInput.value + numButton.metaData.action
                this.mathInput.value = newInputValue
            })
        })
    }

    private renderHTML() {
        const root = document.querySelector('.container')!
        const calculatorBlock = new BlockElement({
            classNames: ['calculator']
        })

        const inputBlock = new BlockElement({ classNames: ['calculator__field'] })
        inputBlock.append(this.mathInput)

        const buttonsBlock = new GridContainer({ colums: 6, gap: 10 })
        buttonsBlock.append(...this.buttons)

        calculatorBlock.insert(root)
        calculatorBlock.append(inputBlock, this.resultBlock, buttonsBlock)
    }

    private formatExpression(expression: string) {
        const regex = /(\^(\d+|π|\([^()]*\)))/g;

        return expression
            .replace(/\*/g, '×')
            .replace(/\//g, '÷')
            .replace(/\-/g, '−')
            .replace(/\pi/g, 'π')
            .replace(/sqrt/g, '√')
            .replace(regex, "<sup>$2</sup>")
    }
}

import { CalculatorKeyboard } from './CalculatorKeyboard/CalculatorKeyboard';
import { WrapperElement } from '@modules/Elements/WrapperElement';
import { IAppError } from 'errors/AppError';
import { CalculatorHistory } from './CalculatorHistory/CalculatorHistory';
import { CalculatorDisplay } from './CalculatorDisplay/CalculatorDisplay';
import { IButtonData } from '@modules/Calculator/models/buttonsData/generate-buttons-data';
import { IHistoryFormat } from 'api/CalculatorAPI';

interface ICalculatorUIParams {
    onEqual: (expression: string) => void;
}

export class CalculatorContainer extends WrapperElement {
    private calculatorKeyboard: CalculatorKeyboard | null = null

    private calculatorDisplay: CalculatorDisplay
    private calculatorHistory: CalculatorHistory

    private params: ICalculatorUIParams;

    constructor(params: ICalculatorUIParams) {
        super({
            wrapperClassNames: 'calculator'
        })
        this.params = params;

        this.calculatorDisplay = new CalculatorDisplay()
        this.calculatorHistory = new CalculatorHistory({
            onHistoryItemClick: this.calculatorDisplay.setExpression.bind(this.calculatorDisplay)
        })

        this.wrapper.append(
            this.calculatorHistory.element,
            this.calculatorDisplay.element,
        );
    }

    showCalculationResult(result: number): void {
        this.calculatorHistory.addHistoryItem({
            result,
            expression: this.calculatorDisplay.inputValue
        })
        this.calculatorDisplay.showResult(result)
    }

    showCalculationError(error: IAppError): void {
        this.calculatorDisplay.showError(error)
    }

    processLoading(loading: boolean): void {
        // this.calculatorKeyboard.changeKeyboardFromLoading(loading)
    }

    updateHistory(history: IHistoryFormat[]): void {
        this.calculatorHistory.setHistory(history)
    }

    addKeyboard(buttonsData: IButtonData[]): void {
        this.calculatorKeyboard = new CalculatorKeyboard({
            buttonsData,
            onEqual: this.onEqualButtonClicked.bind(this),
            onChar: this.onButtonClick.bind(this),
            onBackspace: this.onBackspace.bind(this),
            onReset: () => { this.calculatorDisplay.setExpression('') },
        })

        this.wrapper.append(this.calculatorKeyboard.element)
    }

    private onButtonClick(clickedButtonValue: string): void {
        const newInputValue = this.calculatorDisplay.inputValue + clickedButtonValue
        this.calculatorDisplay.setExpression(newInputValue)
    }

    private onBackspace(): void {
        const newInputValue = this.calculatorDisplay.inputValue.slice(0, -1)
        this.calculatorDisplay.setExpression(newInputValue)
    }

    private onEqualButtonClicked(): void {
        const expression = this.calculatorDisplay.inputValue
        const isExpressionEmpty = expression.trim() === ''

        if (!isExpressionEmpty) {
            this.params.onEqual(expression)
        }
    }
}

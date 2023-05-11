import { CalculatorKeyboard } from './CalculatorKeyboard/CalculatorKeyboard';
import { IAppError } from 'errors/AppError';
import { CalculatorHistory } from './CalculatorHistory/CalculatorHistory';
import { CalculatorDisplay } from './CalculatorDisplay/CalculatorDisplay';
import { IHistoryFormat, IOperationsData } from 'api/CalculatorAPI';
import { DivElement } from '@modules/Elements/DivElement';
import { Loader } from '@modules/Loader';

interface ICalculatorUIParams {
    onEqual: (expression: string) => void;
}

export class CalculatorContainer extends DivElement {
    private calculatorKeyboard: CalculatorKeyboard | null = null

    private calculatorDisplay: CalculatorDisplay
    private calculatorHistory: CalculatorHistory

    private params: ICalculatorUIParams;

    constructor(params: ICalculatorUIParams) {
        super({
            classNames: 'calculator'
        })
        this.params = params;

        this.calculatorDisplay = new CalculatorDisplay()
        this.calculatorHistory = new CalculatorHistory({
            onHistoryItemClick: this.calculatorDisplay.setExpression.bind(this.calculatorDisplay)
        })

        this.append(
            this.calculatorHistory,
            this.calculatorDisplay,
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
        Loader.addLoaderByLoading({
            loading,
            component: this,
            loadingOptions: {
                fillElement: true
            }
        })
    }

    calculationLoading(loading: boolean): void {
        Loader.addLoaderByLoading({
            loading,
            component: this,
            loadingOptions: {
                fillElement: true,
                transparentBG: true
            }
        })
    }

    updateHistory(history: IHistoryFormat[]): void {
        this.calculatorHistory.setHistory(history)
    }

    addKeyboard(buttonsData: IOperationsData[]): void {
        this.calculatorKeyboard = new CalculatorKeyboard({
            buttonsData,
            onEqual: this.onEqualButtonClicked.bind(this),
            onChar: this.onButtonClick.bind(this),
            onBackspace: this.onBackspace.bind(this),
            onReset: () => { this.calculatorDisplay.setExpression('') },
        })

        this.append(this.calculatorKeyboard)
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

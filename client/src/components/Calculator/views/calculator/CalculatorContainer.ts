import { CalculatorOutput } from './CalculatorOutput/CalculatorOutput';
import { CalculatorInput } from './CalculatorInput/CalculatorInput';
import { CalculatorKeyboard } from './CalculatorKeyboard/CalculatorKeyboard';
import { WrapperElement } from '@components/Elements/WrapperElement';
import { IAppError, IErrorRange } from 'errors/AppError';
import { CalculatorHistory } from './CalculatorHistory/CalculatorHistory';
import { CalculatorDisplay } from './CalculatorDisplay/CalculatorDisplay';

interface ICalculatorUIParams {
    onEqual: (expression: string) => void;
}

export class CalculatorContainer extends WrapperElement {
    // private calculatorInput: CalculatorInput;
    // private calculatorOutput: CalculatorOutput;
    private calculatorDisplay: CalculatorDisplay
    private calculatorKeyboard: CalculatorKeyboard;
    private calculatorHistory: CalculatorHistory

    private params: ICalculatorUIParams;

    constructor(params: ICalculatorUIParams) {
        super({
            wrapperClassNames: 'calculator'
        })
        this.params = params;
        this.calculatorDisplay = new CalculatorDisplay()
        // this.calculatorInput = new CalculatorInput()
        // this.calculatorOutput = new CalculatorOutput()
        this.calculatorKeyboard = new CalculatorKeyboard({
            onEqual: this.onEqualButtonClicked.bind(this),
            onChar: this.onButtonClick.bind(this),
            onBackspace: this.onBackspace.bind(this),
            onReset: () => { this.calculatorDisplay.setExpression('') },
        });
        this.calculatorHistory = new CalculatorHistory()

        this.wrapper.append(
            this.calculatorHistory.element,
            this.calculatorDisplay.element,
            // this.calculatorInput.element,
            // this.calculatorOutput.element,
            this.calculatorKeyboard.element,
        );
    }

    showCalculationResult(result: number): void {
        this.calculatorDisplay.showResult(result)
        // const expression = this.calculatorInput.inputText
        // this.calculatorOutput.showCalculationResult({ result, expression })
        // const resultString = result.toString()
        // this.calculatorInput.setInputValue(resultString)
    }

    showCalculationError(error: IAppError): void {
        this.calculatorDisplay.showError(error)
    }

    processLoading(loading: boolean) {
        this.calculatorKeyboard.changeKeyboardFromLoading(loading)
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

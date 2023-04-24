import { IAppError, IErrorRange } from '../../../../exceptions/IErrors';
import { CalculatorOutput } from './CalculatorOutput/CalculatorOutput';
import { CalculatorInput } from './CalculatorInput/CalculatorInput';
import { CalculatorKeyboard } from './CalculatorKeyboard/CalculatorKeyboard';
import { WrapperElement } from '@components/Elements/WrapperElement';

interface ICalculatorUIParams {
    onEqual: (expression: string) => void;
}

export class CalculatorContainer extends WrapperElement {
    private calculatorInput: CalculatorInput;
    private calculatorOutput: CalculatorOutput;
    private calculatorKeyboard: CalculatorKeyboard;
    private params: ICalculatorUIParams;

    constructor(params: ICalculatorUIParams) {
        super({
            wrapperClassNames: 'calculator'
        })
        this.params = params;

        this.calculatorInput = new CalculatorInput()
        this.calculatorOutput = new CalculatorOutput()
        this.calculatorKeyboard = new CalculatorKeyboard({
            onEqual: this.onEqualButtonClicked.bind(this),
            onChar: this.onButtonClick.bind(this),
            onBackspace: this.onBackspace.bind(this),
            onReset: () => { this.calculatorInput.setInputValue('') },
        });

        this.wrapper.append(
            this.calculatorInput.element,
            this.calculatorOutput.element,
            this.calculatorKeyboard.element,
        );
    }

    showCalculationResult(result: number): void {
        const expression = this.calculatorInput.inputText
        this.calculatorOutput.showCalculationResult({ result, expression })
        this.calculatorInput.setInputValue(`${result}`)
    }

    showCalculationError(error: IAppError): void {
        const expressionWithError = this.calculatorInput.inputText
        this.calculatorOutput.showErrorInfo({
            error,
            expressionWithError,
            onErrorClick: this.onErrorClick.bind(this)
        })
    }

    private onErrorClick(range: IErrorRange): void {
        this.calculatorInput.inputElement.focus()
        this.calculatorInput.inputElement.setSelectionRange(range.from, range.to + 1)
    }

    private onButtonClick(clickedButtonValue: string): void {
        const newInputValue = this.calculatorInput.inputText + clickedButtonValue
        this.calculatorInput.setInputValue(newInputValue)
    }

    private onBackspace(): void {
        const newInputValue = this.calculatorInput.inputText.slice(0, -1)
        this.calculatorInput.setInputValue(newInputValue)
    }

    private onEqualButtonClicked(): void {
        const expression = this.calculatorInput.inputText
        const isExpressionEmpty = expression.trim() === ''

        if (!isExpressionEmpty) {
            this.params.onEqual(expression)
        }
    }
}

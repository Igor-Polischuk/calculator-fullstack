import { IError, IErrorRange } from '../../interfaces/ICalculator';
import { CalculatorOutput } from './CalculatorOutput/CalculatorOutput';
import { CalculatorInput } from './CalculatorInput/CalculatorInput';
import { CalculatorKeyboard } from './CalculatorKeyboard/CalculatorKeyboard';
import { WrapperElement } from '@components/Elements/ComplexElement';

interface ICalculatorUIParams {
    onEqual: (expression: string) => void;
}

export class CalculatorContainer extends WrapperElement {
    private calculatorInput: CalculatorInput;
    private calculatorOutput: CalculatorOutput;
    private calculatorKeyboard: CalculatorKeyboard;

    private replaceCurrentNumberInInput
    private params: ICalculatorUIParams;

    constructor(params: ICalculatorUIParams) {
        super({
            wrapperClassNames: 'calculator'
        })
        this.params = params;
        this.replaceCurrentNumberInInput = true

        this.calculatorInput = new CalculatorInput();
        this.calculatorOutput = new CalculatorOutput({
            onErrorClick: this.onErrorClick.bind(this)
        });
        this.calculatorKeyboard = new CalculatorKeyboard({
            onEqual: this.setExpression.bind(this),
            onChar: this.onButtonClick.bind(this),
            onBackspace: this.onBackspace.bind(this),
            onReset: () => {
                this.calculatorInput.setInputValue('0')
                this.replaceCurrentNumberInInput = true
            },
        });

        this.wrapper.append(
            this.calculatorInput.element,
            this.calculatorOutput.element,
            this.calculatorKeyboard.element,
        );
    }

    showCalculationResult(result: number) {
        const calculatedExpression = this.calculatorInput.inputText
        this.calculatorOutput.showCalculationResult(result, calculatedExpression)
        this.calculatorInput.setInputValue(`${result}`)
    }

    showCalculationError(error: IError | IError[]) {
        const expressionWithError = this.calculatorInput.inputText
        if (Array.isArray(error)) {
            this.calculatorOutput.showValidationError(error, expressionWithError)
        } else if (error.hasOwnProperty('payload')) {
            this.calculatorOutput.showTextError(error.message)
        } else {
            this.calculatorOutput.showTextError('An unexpected error occurred while evaluating the expression')
        }
    }

    private onErrorClick(range: IErrorRange) {
        this.calculatorInput.inputElement.focus()
        this.calculatorInput.inputElement.setSelectionRange(range.from, range.to + 1);
    }

    private onButtonClick(clickedButtonValue: string) {
        const newInputValue = this.replaceCurrentNumberInInput
            ? clickedButtonValue
            : this.calculatorInput.inputText + clickedButtonValue
        this.calculatorInput.setInputValue(newInputValue)
        this.replaceCurrentNumberInInput = false
    }

    private onBackspace() {
        if (this.calculatorInput.inputText === '0' || this.calculatorInput.inputText.length <= 1) {
            this.calculatorInput.setInputValue('0')
            this.replaceCurrentNumberInInput = true
            return
        }
        const newInputValue = this.calculatorInput.inputText.slice(0, -1)
        this.calculatorInput.setInputValue(newInputValue)
    }

    private setExpression() {
        const expression = this.calculatorInput.inputText
        const isExpressionEmpty = expression.trim() === ''

        if (!isExpressionEmpty) {
            this.params.onEqual(expression);
        }
    }
}

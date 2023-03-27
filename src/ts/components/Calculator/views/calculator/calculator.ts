import { IError } from './../../interfaces/ICalculator';
import { CalculatorDisplay } from './CalculatorDisplay/CalculatorDisplay';
import { DivElement } from '@components/Elements/DivElement';
import { CalculatorInput } from './CalculatorInput/CalculatorInput';
import { CalculatorKeyboard } from './CalculatorKeyboard/CalculatorKeyboard';

interface ICalculatorUIOptions {
    onExpressionChange: (expression: string) => void;
}

export class CalculatorUI {
    private calculatorWrapper: DivElement;
    private calculatorInput: CalculatorInput;
    private calculatorDisplay: CalculatorDisplay;
    private calculatorKeyboard: CalculatorKeyboard;
    private options: ICalculatorUIOptions;
    constructor(options: ICalculatorUIOptions) {
        this.options = options;
        this.calculatorWrapper = new DivElement({ classNames: 'calculator' });
        this.calculatorInput = new CalculatorInput();
        this.calculatorDisplay = new CalculatorDisplay();
        this.calculatorKeyboard = new CalculatorKeyboard({
            onEqual: this.setExpression.bind(this),
            setInputValue: this.calculatorInput.setInputValue.bind(this.calculatorInput)
        });

        this.calculatorWrapper.append(
            this.calculatorInput.element,
            this.calculatorDisplay.element,
            this.calculatorKeyboard.element,
        );
    }

    get element() {
        return this.calculatorWrapper;
    }

    renderResult(result: number | IError[]) {
        this.calculatorDisplay.renderCalculationResult(result, this.calculatorInput.inputText)
        if (typeof result === 'number') this.calculatorInput.setInputValue(() => result.toString())
    }

    private setExpression() {
        const expression = this.calculatorInput.inputText;
        if (expression.trim() === '') return
        this.options.onExpressionChange(expression);
    }
}

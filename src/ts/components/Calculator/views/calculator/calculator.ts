import { IError } from './../../interfaces/ICalculator';
import { CalculatorDisplay } from './CalculatorResultDisplay/CalculatorDisplay';
import { DivElement } from '@components/Elements/DivElement';
import { CalculatorInput } from './CalculatorInput/CalculatorInput';
import { CalculatorKeyboard } from './CalculatorKeyboard/CalculatorKeyboard';

interface ICalculatorUIOptions {
    onExpressionChange: (expression: string) => void;
}

export class CalculatorUI {
    private calculatorBlock: DivElement;
    private calculatorInput: CalculatorInput;
    private calculatorDisplay: CalculatorDisplay;
    private calculatorKeyboard: CalculatorKeyboard;
    private options: ICalculatorUIOptions;
    constructor(options: ICalculatorUIOptions) {
        this.options = options;
        this.calculatorBlock = new DivElement({ classNames: 'calculator' });
        this.calculatorInput = new CalculatorInput();
        this.calculatorDisplay = new CalculatorDisplay();
        this.calculatorKeyboard = new CalculatorKeyboard({
            onEqual: this.setExpression.bind(this),
            onValueChange: (value) => this.calculatorInput.update(value),
        });

        this.calculatorBlock.append(
            this.calculatorInput.element,
            this.calculatorDisplay.element,
            this.calculatorKeyboard.element,
        );
    }

    renderResult(result: number) {
        this.calculatorDisplay.showResult(result, this.calculatorInput.inputText);
        const resultStr = result.toString();
        this.calculatorInput.update(resultStr);
        this.calculatorKeyboard.setValue(resultStr);
    }

    renderError(errors: IError[]) {
        this.calculatorDisplay.showError(errors, this.calculatorInput.inputText);
    }

    get element() {
        return this.calculatorBlock;
    }

    private setExpression() {
        const expression = this.calculatorInput.inputText;
        this.options.onExpressionChange(expression);
    }
}

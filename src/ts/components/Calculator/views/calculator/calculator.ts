import { IError } from './../../interfaces/ICalculator';
import { CalculatorDisplay } from './CalculatorDisplay/CalculatorDisplay';
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
            updateInputValue: (value) => this.calculatorInput.update(value),
        });

        this.calculatorInput.onInput((value) => this.calculatorKeyboard.value = value)

        this.calculatorBlock.append(
            this.calculatorInput.element,
            this.calculatorDisplay.element,
            this.calculatorKeyboard.element,
        );
    }

    renderResult(result: number | IError[]) {
        this.calculatorDisplay.renderCalculationResult(result, this.calculatorInput.inputText)
        if(typeof result === 'number') this.synchronizeTheKeyboardAndInput(`${result}`)
    }

    get element() {
        return this.calculatorBlock;
    }

    private synchronizeTheKeyboardAndInput(value: string){
        this.calculatorKeyboard.value = value
        this.calculatorInput.update(value)
    }

    private setExpression() {
        const expression = this.calculatorInput.inputText;
        if (expression.trim() === '') return
        this.options.onExpressionChange(expression);
    }
}

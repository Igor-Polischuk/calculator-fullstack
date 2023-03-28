import { ClassName } from './ClassName';
import { IError } from './../../interfaces/ICalculator';
import { CalculatorOutput } from './CalculatorDisplay/CalculatorOutput';
import { DivElement } from '@components/Elements/DivElement';
import { CalculatorInput } from './CalculatorInput/CalculatorInput';
import { CalculatorKeyboard } from './CalculatorKeyboard/CalculatorKeyboard';

interface ICalculatorUIOptions {
    onEqual: (expression: string) => void;
}

export class CalculatorUI {
    private calculatorWrapper: DivElement;
    private calculatorInput: CalculatorInput;
    private calculatorOutput: CalculatorOutput;
    private calculatorKeyboard: CalculatorKeyboard;
    private options: ICalculatorUIOptions;
    constructor(options: ICalculatorUIOptions) {
        this.options = options;
        this.calculatorWrapper = new DivElement({ classNames: ClassName.CALCULATOR_WRAPPER });
        this.calculatorInput = new CalculatorInput();
        this.calculatorOutput = new CalculatorOutput();
        this.calculatorKeyboard = new CalculatorKeyboard({
            onEqual: this.setExpression.bind(this),
            setInputValue: this.calculatorInput.setInputValue.bind(this.calculatorInput)
        });

        this.calculatorWrapper.append(
            this.calculatorInput.element,
            this.calculatorOutput.element,
            this.calculatorKeyboard.element,
        );
    }

    get element() {
        return this.calculatorWrapper;
    }

    showCalculationResult(result: number){
        this.calculatorOutput.showCalculationResult(result, this.calculatorInput.inputText)
        this.calculatorInput.setInputValue(() => result.toString())
    }

    showCalculationError(errors: IError[]){
        this.calculatorOutput.showCalculationError(errors, this.calculatorInput.inputText)
    }

    private setExpression() {
        const expression = this.calculatorInput.inputText;
        if (expression.trim() === '') return
        this.options.onEqual(expression);
    }
}

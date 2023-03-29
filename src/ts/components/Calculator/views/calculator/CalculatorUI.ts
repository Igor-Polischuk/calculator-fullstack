import { ClassName } from './ClassName';
import { IError } from '../../interfaces/ICalculator';
import { CalculatorOutput } from './CalculatorOutput/CalculatorOutput';
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
            onEqual: () => this.setExpression(),
            onButtonClick: (clickedButtonValue) => this.calculatorInput.setInputValue(value => value + clickedButtonValue),
            onReset: () => this.calculatorInput.setInputValue(() => ''),
            onBackspace: () => this.calculatorInput.setInputValue(value => value.slice(0, -1))
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

    private handleKeyboardClick(clickedButtonValue: string){
        this.calculatorInput.setInputValue(value => value + clickedButtonValue)
        
    }

    private setExpression() {
        const expression = this.calculatorInput.inputText;
        if (expression.trim() === '') return
        this.options.onEqual(expression);
    }
}

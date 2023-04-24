import { IBaseElement } from '@components/Elements/interfaces';
import { WrapperElement } from '@components/Elements/ComplexElement';
import { ResultOutput } from './ResultParagraph';
import { ErrorHandler, IShowErrorInfoProps } from './ErrorHandler';

interface IShowCalculationResultProps {
    result: number
    expression: string
}

export class CalculatorOutput extends WrapperElement {
    private errorHandlers: ErrorHandler;

    constructor() {
        super({
            wrapperClassNames: 'calculator__result',
        })
        this.errorHandlers = new ErrorHandler()
    }

    showCalculationResult(params: IShowCalculationResultProps): void {
        const resultOutput = new ResultOutput(params)
        this.appendOutputElement(resultOutput.element)
    }

    showErrorInfo(params: IShowErrorInfoProps): void {
        const errorHandler = this.errorHandlers[params.error.type] || this.errorHandlers.getDefaultErrorBlock
        const blockWithErrorInfo = errorHandler(params)
        this.appendOutputElement(blockWithErrorInfo)
    }

    private appendOutputElement(element: IBaseElement): void {
        this.updateOutput()
        this.wrapper.append(element)
    }

    private updateOutput(): void {
        this.wrapper.domElement.classList.add('visible')
        this.wrapper.removeElement('#result-display')
    }
}
import { IBaseElement } from '@components/Elements/interfaces';
import { WrapperElement } from '@components/Elements/WrapperElement';
import { ResultOutput } from './output-components/ResultParagraph';
import { errorComponentByType } from './error-component-by-type';
import { DefaultErrorComponent } from './output-components/DefaultErrorComponent';
import { ErrorType } from 'errors/error-type';
import { IAppError, IErrorRange } from 'errors/AppError';

interface IShowCalculationResultProps {
    result: number
    expression: string
}

export interface IShowErrorInfoProps {
    error: IAppError
    expressionWithError: string
    onErrorClick: (range: IErrorRange) => void

}

export class CalculatorOutput extends WrapperElement {
    constructor() {
        super({
            wrapperClassNames: 'calculator__result',
        })
    }

    showCalculationResult(params: IShowCalculationResultProps): void {
        const resultOutput = new ResultOutput(params)
        this.appendOutputElement(resultOutput.element)
    }

    showErrorInfo(params: IShowErrorInfoProps): void {
        const ErrorComponentClass = errorComponentByType[params.error.type] || DefaultErrorComponent

        const errorComponentInstance = new ErrorComponentClass(params)
        this.appendOutputElement(errorComponentInstance.element)
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
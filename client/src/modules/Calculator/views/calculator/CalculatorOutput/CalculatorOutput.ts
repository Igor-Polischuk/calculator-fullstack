import { IBaseElement } from '@modules/Elements/interfaces';
import { WrapperElement } from '@modules/Elements/WrapperElement';
import { errorComponentByType } from './error-component-by-type';
import { DefaultErrorComponent } from './output-components/DefaultErrorComponent';
import { IAppError, IErrorRange } from 'errors/AppError';
import { replaceMathOperators } from '@utilities/formatText/replaceMathOperators';
import { Paragraph } from '@modules/Elements/Paragraph';

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
        this.showInputtedValue('0')
    }

    showCalculationResult(params: IShowCalculationResultProps): void {
        const expression = replaceMathOperators(params.expression)
        const resultOutput = new Paragraph({ text: `${expression}=`, id: 'result-display', classNames: 'display-result showup' })
        this.appendOutputElement(resultOutput)
    }

    showInputtedValue(inputtedExpression: string) {
        this.updateOutput()
        const formattedExpression = replaceMathOperators(inputtedExpression)
        const p = new Paragraph({ text: formattedExpression, id: 'result-display' })
        this.wrapper.append(p)
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
import { IBaseElement } from 'common/Elements/interfaces';
import { errorComponentByType } from './error-component-by-type';
import { DefaultErrorComponent } from './output-components/DefaultErrorComponent';
import { IAppError, IErrorRange } from 'common/AppError/IAppError';
import { replaceMathOperators } from '@utilities/formatText/replaceMathOperators';
import { Paragraph } from 'common/Elements/Paragraph';
import { DivElement } from 'common/Elements/DivElement';
import { cutText } from '@utilities/formatText/cutText';

interface IShowCalculationResultProps {
    result: number
    expression: string
}

export interface IShowErrorInfoProps {
    error: IAppError
    expressionWithError: string
    onErrorClick: (range: IErrorRange) => void

}

export class CalculatorOutput extends DivElement {
    private maxTextLength = 50

    constructor() {
        super({
            classNames: 'calculator__result',
        })
        this.showInputtedValue('')
    }

    showCalculationResult(params: IShowCalculationResultProps): void {
        const expression = replaceMathOperators(params.expression)
        const text = cutText(`${expression}=`, this.maxTextLength)
        console.log(expression);
        console.log(text);

        const resultOutput = new Paragraph({ text, id: 'result-display', classNames: 'display-result showup' })
        this.appendOutputElement(resultOutput)
    }

    showInputtedValue(inputtedExpression: string) {
        this.updateOutput()
        const formattedExpression = replaceMathOperators(inputtedExpression)
        const p = new Paragraph({ text: formattedExpression, id: 'result-display' })
        this.append(p)
    }

    showErrorInfo(params: IShowErrorInfoProps): void {
        const ErrorComponentClass = errorComponentByType[params.error.type] || DefaultErrorComponent

        const errorComponentInstance = new ErrorComponentClass(params)
        this.appendOutputElement(errorComponentInstance)
    }

    private appendOutputElement(element: IBaseElement): void {
        this.updateOutput()
        this.append(element)
    }

    private sliceLongString(text: string) {
        return `...${text.substring(text.length - this.maxTextLength)}`
    }

    private updateOutput(): void {
        this.domElement.classList.add('visible')
        this.removeElement('#result-display')
    }
}
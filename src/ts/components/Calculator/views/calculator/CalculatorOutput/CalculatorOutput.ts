import { Paragraph } from '@components/Elements/Paragraph';
import { IError, IErrorRange } from "@components/Calculator/interfaces/IErrors";
import { removeOverlappingRanges } from '@utilities/ranges/removeOverlappingRanges';
import { HighlightedErrors } from './HighlightedErrors';
import { IBaseElement } from '@components/Elements/interfaces';
import { WrapperElement } from '@components/Elements/ComplexElement';
import { ResultOutput } from './ResultParagraph';
import { Span } from '@components/Elements/Span';


interface ICalculatorOutputParams {
    onErrorClick: (range: IErrorRange) => void
}

export class CalculatorOutput extends WrapperElement {
    private params: ICalculatorOutputParams;
    constructor(params: ICalculatorOutputParams) {
        super({
            wrapperClassNames: 'calculator__result',
        })
        this.params = params
    }

    showCalculationResult(result: number, calculatedExpression: string): void {
        const resultOutput = new ResultOutput({
            expression: calculatedExpression,
            result
        })
        this.renderParagraph({
            children: resultOutput.element.childElements,
            className: 'result showup'
        })
    }

    showValidationError(errors: IError[], expressionWithError: string): void {
        const invalidPartsIndexes = errors.flatMap(error => error.payload?.errorPlace!)
        const invalidExpressionPartsIndexes = removeOverlappingRanges(invalidPartsIndexes)
        const paragraphWithHighlightedErrors = new HighlightedErrors({
            expressionWithErrors: expressionWithError,
            errorRanges: invalidExpressionPartsIndexes,
            errors,
            onErrorClick: this.params.onErrorClick
        })

        this.renderParagraph({
            className: 'error',
            children: paragraphWithHighlightedErrors.element.childElements
        })
    }

    showErrorMessage(errorMessage: string): void {
        this.renderParagraph({
            children: [new Span({ text: errorMessage })],
            className: 'error'
        })
    }

    private renderParagraph(params: { text?: string, className?: string, children?: IBaseElement[] }): void {
        this.wrapper.domElement.classList.add('visible')
        this.wrapper.removeElement('#result-display')
        const p = new Paragraph({ text: params.text || '', classNames: params.className, id: 'result-display' })
        params.text || params.children && p.append(...params.children)
        this.wrapper.append(p)
    }
}
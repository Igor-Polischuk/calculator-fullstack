import { IErrorRange } from './../../../interfaces/ICalculator';
import { Paragraph } from '@components/Elements/Paragraph';
import { IError } from "@components/Calculator/interfaces/ICalculator";
import { DivElement } from "@components/Elements/DivElement";
import { formatExpression } from '@utilities/formatText/formatExpression';
import { replaceMathOperators } from '@utilities/formatText/replaceMathOperators';
import { removeOverlappingRanges } from '@utilities/ranges/removeOverlappingRanges';
import { Span } from '@components/Elements/Span';
import { HighlightedErrors } from './HighlightedErrors';
import { IBaseElement } from '@components/Elements/interfaces';

// interface IHighlightErrorsReduce {
//     lastErrorIndex: number
//     spansArray: Span[]
// }

interface ICalculatorOutputParams {
    onErrorClick: (range: IErrorRange) => void
}

export class CalculatorOutput {
    private outputWrapper: DivElement
    params: ICalculatorOutputParams;
    constructor(params: ICalculatorOutputParams) {
        this.params = params
        this.outputWrapper = new DivElement({ classNames: 'calculator__result' })
    }

    get element() {
        return this.outputWrapper
    }

    showCalculationResult(result: number, calculatedExpression: string) {
        const expressionSpan = new Span({ text: replaceMathOperators(calculatedExpression) })
        const equalSymbolSpan = new Span({ text: ' = ' })
        const resultSpan = new Span({ classNames: 'bold', text: result.toString() })
        this.renderParagraph({
            children: [expressionSpan, equalSymbolSpan, resultSpan],
            className: 'result showup'
        })
    }


    showCalculationError(errors: IError[], expressionWithError: string) {
        const invalidExpressionPartsIndexes = this.getInvalidExpressionPartsIndexes(errors)
        if (invalidExpressionPartsIndexes.length === 0) {
            this.renderParagraph({
                text: errors[0].message,
                className: 'error'
            })
            return
        }

        const formattedExpressionWithError = formatExpression(expressionWithError)
        const paragraphWithHighlightedErrors = new HighlightedErrors({
            expressionWithErrors: formattedExpressionWithError,
            errorRanges: invalidExpressionPartsIndexes,
            onErrorClick: this.params.onErrorClick
        })

        this.renderParagraph({
            className: 'error',
            children: paragraphWithHighlightedErrors.element.childElements
        })
    }

    private getInvalidExpressionPartsIndexes(errors: IError[]) {
        const invalidPartsIndexes = errors.flatMap(error => error.errorPlace || [])
        return removeOverlappingRanges(invalidPartsIndexes)
    }

    private renderParagraph(params: { text?: string, className?: string, children?: IBaseElement[] }) {
        this.outputWrapper.domElement.classList.add('visible')
        this.outputWrapper.removeElement('#result-display')
        const p = new Paragraph({ text: params.text || '', classNames: params.className, id: 'result-display' })
        params.children && p.append(...params.children)
        this.outputWrapper.append(p)
    }
}
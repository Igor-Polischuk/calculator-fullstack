import { Paragraph } from '@components/Elements/Paragraph';
import { IError, IErrorRange } from "@components/Calculator/interfaces/ICalculator";
import { formatExpression } from '@utilities/formatText/formatExpression';
import { removeOverlappingRanges } from '@utilities/ranges/removeOverlappingRanges';
import { HighlightedErrors } from './HighlightedErrors';
import { IBaseElement } from '@components/Elements/interfaces';
import { ComplexElement } from '@components/Elements/ComplexElement';
import { ResultOutput } from './ResultParagraph';


interface ICalculatorOutputParams {
    onErrorClick: (range: IErrorRange) => void
}

export class CalculatorOutput extends ComplexElement {
    private params: ICalculatorOutputParams;
    constructor(params: ICalculatorOutputParams) {
        super({
            wrapperClassNames: 'calculator__result'
        })
        this.params = params
    }

    showCalculationResult(result: number, calculatedExpression: string) {
        const resultOutput = new ResultOutput({
            expression: calculatedExpression,
            result
        })
        this.renderParagraph({
            children: resultOutput.element.childElements,
            className: 'result showup'
        })
    }

    showCalculationError(errors: IError[], expressionWithError: string) {
        const invalidPartsIndexes = errors.flatMap(error => error.errorPlace || [])
        const invalidExpressionPartsIndexes = removeOverlappingRanges(invalidPartsIndexes)
        const paragraphWithHighlightedErrors = new HighlightedErrors({
            expressionWithErrors: expressionWithError,
            errorRanges: invalidExpressionPartsIndexes,
            onErrorClick: this.params.onErrorClick
        })

        this.renderParagraph({
            className: 'error',
            text: invalidExpressionPartsIndexes.length === 0 ? errors[0].message : '',
            children: paragraphWithHighlightedErrors.element.childElements
        })
    }

    private renderParagraph(params: { text?: string, className?: string, children?: IBaseElement[] }) {
        this.wrapper.domElement.classList.add('visible')
        this.wrapper.removeElement('#result-display')
        const p = new Paragraph({ text: params.text || '', classNames: params.className, id: 'result-display' })
        params.text || params.children && p.append(...params.children)
        this.wrapper.append(p)
    }
}
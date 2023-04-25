import { IError, IErrorRange } from "exceptions/IErrors";
import { WrapperElement } from "@components/Elements/WrapperElement";
import { Span } from "@components/Elements/Span";
import { removeOverlappingRanges } from "@utilities/ranges/removeOverlappingRanges";
import { IShowErrorInfoProps } from "../CalculatorOutput";

interface IHighlightedErrorsParams extends IShowErrorInfoProps {
    onErrorClick: (range: IErrorRange) => void
}

interface HighlightErrorsReduceResult {
    lastErrorIndex: number
    spansArray: Span[]
}

export class HighlightedErrors extends WrapperElement {
    private params: IHighlightedErrorsParams
    private invalidExpressionPartsIndexes: IErrorRange[]
    private errors: IError[]

    constructor(params: IHighlightedErrorsParams) {
        super({
            wrapperClassNames: 'error',
            wrapperId: 'result-display'
        })
        this.params = params
        this.errors = params.error.errors
        this.invalidExpressionPartsIndexes = this.getInvalidIndexes()
        const errorSpans = this.generateErrorSpans()
        this.wrapper.append(...errorSpans)
    }

    private generateErrorSpans(): Span[] {
        const { spansArray, lastErrorIndex } = this.invalidExpressionPartsIndexes.reduce<HighlightErrorsReduceResult>(
            ({ spansArray, lastErrorIndex }, { from, to }) => {
                const notErrorString = this.params.expressionWithError.slice(lastErrorIndex, from)
                const notErrorSpan = new Span({ text: notErrorString })

                const errorString = this.params.expressionWithError.slice(from, to + 1)
                const errorSpan = new Span({ text: errorString, classNames: 'error-span' })

                const errorMessage = this.getErrorMessageByRangeStart(from)
                errorSpan.domElement.title = this.uppercaseFirstLetter(errorMessage)

                errorSpan.onClick(() => this.params.onErrorClick({ from, to }))

                return {
                    spansArray: [...spansArray, notErrorSpan, errorSpan],
                    lastErrorIndex: from + (to - from) + 1
                };
            }, { lastErrorIndex: 0, spansArray: [new Span({ text: 'Invalid expression: ' })] })

        return spansArray.concat(new Span({ text: this.params.expressionWithError.slice(lastErrorIndex) }))
    }

    private getInvalidIndexes(): IErrorRange[] {
        const invalidPartsIndexes = this.errors.flatMap(error => error.payload?.errorPlace!)
        const invalidExpressionPartsIndexes = removeOverlappingRanges(invalidPartsIndexes)
        return invalidExpressionPartsIndexes
    }

    private getErrorMessageByRangeStart(from: number): string {
        return this.errors.find(e => e.payload?.errorPlace?.find(error => error.from === from))?.message || ''
    }

    private uppercaseFirstLetter(text: string): string {
        return text[0].toUpperCase() + text.slice(1)
    }
}
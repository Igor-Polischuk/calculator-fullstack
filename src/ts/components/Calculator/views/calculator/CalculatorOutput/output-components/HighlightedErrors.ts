import { IError, IErrorRange } from "exceptions/IErrors";
import { WrapperElement } from "@components/Elements/WrapperElement";
import { Span } from "@components/Elements/Span";
import { removeOverlappingRanges } from "@utilities/ranges/removeOverlappingRanges";
import { IShowErrorInfoProps } from "../CalculatorOutput";

interface IHighlightErrorsReduceResult {
    lastErrorIndex: number
    spansArray: Span[]
}

interface IGetNotErrorSpanParams {
    lastErrorIndex: number
    from: number
}

export class HighlightedValidationErrors extends WrapperElement {
    private params: IShowErrorInfoProps
    private invalidExpressionPartsIndexes: IErrorRange[]
    private errors: IError[]
    private expressionWithError: string

    constructor(highlightedErrorsParams: IShowErrorInfoProps) {

        super({
            wrapperClassNames: 'error',
            wrapperId: 'result-display'
        })

        this.params = highlightedErrorsParams
        this.errors = highlightedErrorsParams.error.errors
        this.expressionWithError = highlightedErrorsParams.expressionWithError
        this.invalidExpressionPartsIndexes = this.getInvalidIndexes()

        const errorSpans = this.generateErrorSpans()
        this.wrapper.append(...errorSpans)
    }

    private generateErrorSpans(): Span[] {
        const { spansArray, lastErrorIndex } = this.invalidExpressionPartsIndexes.reduce<IHighlightErrorsReduceResult>(
            ({ spansArray, lastErrorIndex }, { from, to }) => {
                const notErrorSpan = this.getNotErrorSpan({ lastErrorIndex, from })
                const errorSpan = this.getErrorSpan({ from, to })

                return {
                    spansArray: [...spansArray, notErrorSpan, errorSpan],
                    lastErrorIndex: from + (to - from) + 1
                }

            }, { lastErrorIndex: 0, spansArray: [] })

        return spansArray.concat(new Span({ text: this.expressionWithError.slice(lastErrorIndex) }))
    }

    private getNotErrorSpan({ lastErrorIndex, from }: IGetNotErrorSpanParams): Span {
        const notErrorString = this.expressionWithError.slice(lastErrorIndex, from)
        const notErrorSpan = new Span({ text: notErrorString })

        return notErrorSpan
    }

    private getErrorSpan({ from, to }: IErrorRange): Span {
        const errorString = this.expressionWithError.slice(from, to + 1)
        const errorSpan = new Span({ text: errorString, classNames: 'error-span' })
        const errorMessage = this.getErrorMessageByRangeStart(from)

        errorSpan.domElement.title = this.uppercaseFirstLetter(errorMessage)
        errorSpan.onClick(() => this.params.onErrorClick({ from, to }))

        return errorSpan
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
import { WrapperElement } from "@modules/Elements/WrapperElement";
import { Span } from "@modules/Elements/Span";
import { removeOverlappingRanges } from "@utilities/ranges/removeOverlappingRanges";
import { IShowErrorInfoProps } from "../CalculatorOutput";
import { HighlightedSpan } from "./HighlightedSpan";
import { IAppError, IErrorRange } from "errors/AppError";

interface IHighlightErrorsReduceResult {
    lastErrorIndex: number
    spansArray: Span[]
}

interface IFormattedError {
    message: string
    errorsStarts: number[]
}

export class HighlightedValidationErrors extends WrapperElement {
    private params: IShowErrorInfoProps
    private invalidExpressionPartsIndexes: IErrorRange[]
    private errors: IAppError
    private expressionWithError: string
    private formattedErrors: IFormattedError[]

    constructor(highlightedErrorsParams: IShowErrorInfoProps) {

        super({
            wrapperClassNames: 'error',
            wrapperId: 'result-display'
        })

        this.params = highlightedErrorsParams
        this.errors = highlightedErrorsParams.error
        this.expressionWithError = highlightedErrorsParams.expressionWithError
        this.invalidExpressionPartsIndexes = this.getInvalidIndexes()
        this.formattedErrors = this.formatError()

        const errorSpans = this.highlightInvalidParts()
        this.wrapper.append(...errorSpans)
    }

    private highlightInvalidParts(): Span[] {
        const { spansArray, lastErrorIndex } = this.invalidExpressionPartsIndexes.reduce<IHighlightErrorsReduceResult>(
            ({ spansArray, lastErrorIndex }, { from, to }) => {
                const validSubstring = this.expressionWithError.slice(lastErrorIndex, from)
                const normalSpan = new Span({ text: validSubstring })

                const invalidString = this.expressionWithError.slice(from, to + 1)
                const errorMessage = this.getErrorMessageByRangeStart(from)

                const highlightedSpan = new HighlightedSpan({
                    text: invalidString,
                    titleAtrText: errorMessage,
                    onClick: () => this.params.onErrorClick({ from, to })
                })

                return {
                    spansArray: [...spansArray, normalSpan, highlightedSpan],
                    lastErrorIndex: from + (to - from) + 1
                }

            }, { lastErrorIndex: 0, spansArray: [] })

        return spansArray.concat(new Span({ text: this.expressionWithError.slice(lastErrorIndex) }))
    }

    private getInvalidIndexes(): IErrorRange[] {
        const invalidPartsIndexes = this.errors.failedValidations.flatMap(range => range.errorPlace)
        const invalidExpressionPartsIndexes = removeOverlappingRanges(invalidPartsIndexes)

        return invalidExpressionPartsIndexes
    }

    private getErrorMessageByRangeStart(from: number): string {
        return this.formattedErrors.find(error => error.errorsStarts.includes(from))?.message || ''
    }

    private formatError(): IFormattedError[] {
        const errors = this.errors.failedValidations.map(error => {
            return {
                message: error.message,
                errorsStarts: error.errorPlace.map(range => range.from)
            }
        })

        return errors
    }
}
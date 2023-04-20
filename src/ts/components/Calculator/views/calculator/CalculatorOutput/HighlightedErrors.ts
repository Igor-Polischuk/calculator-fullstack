import { IError, IErrorRange } from "@components/Calculator/interfaces/IErrors";
import { WrapperElement } from "@components/Elements/ComplexElement";
import { Span } from "@components/Elements/Span";

interface IHighlightedErrorsParams {
    errorRanges: IErrorRange[]
    expressionWithErrors: string
    errors: IError[]
    onErrorClick: (range: IErrorRange) => void
}

interface HighlightErrorsReduceResult {
    lastErrorIndex: number
    spansArray: Span[]
}

export class HighlightedErrors extends WrapperElement {
    private params: IHighlightedErrorsParams
    constructor(params: IHighlightedErrorsParams) {
        super({
            wrapperClassNames: 'error',
            wrapperId: 'result-display'
        })
        this.params = params
        const errorSpans = this.generateErrorSpans()
        this.wrapper.append(...errorSpans)
    }

    private generateErrorSpans(): Span[] {
        const { spansArray, lastErrorIndex } = this.params.errorRanges.reduce<HighlightErrorsReduceResult>(
            ({ spansArray, lastErrorIndex }, { from, to }) => {
                const notErrorString = this.params.expressionWithErrors.slice(lastErrorIndex, from)
                const notErrorSpan = new Span({ text: notErrorString })

                const errorString = this.params.expressionWithErrors.slice(from, to + 1)
                const errorSpan = new Span({ text: errorString, classNames: 'error-span' })

                const errorMessage = this.getErrorMessageByRangeStart(from)
                errorSpan.domElement.title = this.uppercaseFirstLetter(errorMessage)

                errorSpan.onClick(() => this.params.onErrorClick({ from, to }))

                return {
                    spansArray: [...spansArray, notErrorSpan, errorSpan],
                    lastErrorIndex: from + (to - from) + 1
                };
            }, { lastErrorIndex: 0, spansArray: [new Span({ text: 'Invalid expression: ' })] })

        return spansArray.concat(new Span({ text: this.params.expressionWithErrors.slice(lastErrorIndex) }))
    }

    private getErrorMessageByRangeStart(from: number) {
        return this.params.errors.find(e => e.payload?.errorPlace?.find(error => error.from === from))?.message || ''
    }

    private uppercaseFirstLetter(text: string) {
        return text[0].toUpperCase() + text.slice(1)
    }
}
import { removeOverlappingRanges } from '@utilities/ranges/removeOverlappingRanges';
import { ErrorType } from 'exceptions/error-type';
import { HighlightedErrors } from './HighlightedErrors';
import { IAppError, IErrorRange } from 'exceptions/IErrors';
import { IBaseElement } from '@components/Elements/interfaces';
import { Paragraph } from '@components/Elements/Paragraph';

export interface IShowErrorInfoProps {
    error: IAppError
    expressionWithError: string
    onErrorClick: (range: IErrorRange) => void

}

type ErrorHandlerFunctionType = (params: IShowErrorInfoProps) => IBaseElement

interface IErrorHandler extends Record<ErrorType, ErrorHandlerFunctionType> {
    getDefaultErrorBlock: () => Paragraph
}

export class ErrorHandler implements IErrorHandler {
    private DEFAULT_MESSAGE = 'Unknown error type';

    [ErrorType.RuntimeError] = this.getErrorMessageBlock.bind(this);
    [ErrorType.UnexpectedError] = this.getErrorMessageBlock.bind(this);
    [ErrorType.ValidationError] = this.getHighlightedErrorsElement.bind(this);

    getDefaultErrorBlock() {
        return this.getParagraph(this.DEFAULT_MESSAGE)
    }

    private getHighlightedErrorsElement(params: IShowErrorInfoProps): IBaseElement {
        const errors = params.error.errors
        const invalidPartsIndexes = errors.flatMap(error => error.payload?.errorPlace!)
        const invalidExpressionPartsIndexes = removeOverlappingRanges(invalidPartsIndexes)

        const highlightedErrors = new HighlightedErrors({
            expressionWithErrors: params.expressionWithError,
            errorRanges: invalidExpressionPartsIndexes,
            errors,
            onErrorClick: params.onErrorClick
        })

        return highlightedErrors.element
    }

    private getErrorMessageBlock(params: IShowErrorInfoProps): IBaseElement {
        const message = params.error.errors[0].message
        const messageParagraph = this.getParagraph(message)
        return messageParagraph
    }

    private getParagraph(text: string): Paragraph {
        return new Paragraph({ text, id: 'result-display' })
    }
}

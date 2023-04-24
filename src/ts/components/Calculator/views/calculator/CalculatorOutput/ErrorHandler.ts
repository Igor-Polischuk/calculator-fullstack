import { removeOverlappingRanges } from '@utilities/ranges/removeOverlappingRanges';
import { ErrorType } from 'exceptions/error-type';
import { HighlightedErrors } from './HighlightedErrors';
import { IAppError } from 'exceptions/IErrors';
import { IBaseElement } from '@components/Elements/interfaces';
import { Paragraph } from '@components/Elements/Paragraph';

export interface IShowErrorInfoProps {
    error: IAppError
    expressionWithError: string
}

export class ErrorHandler implements Record<ErrorType, (params: IShowErrorInfoProps) => IBaseElement> {
    [ErrorType.RuntimeError] = this.getErrorMessageBlock.bind(this);
    [ErrorType.UnexpectedError] = this.getErrorMessageBlock.bind(this);
    [ErrorType.ValidationError] = this.getHighlightedErrorsElement.bind(this);

    private getHighlightedErrorsElement(params: IShowErrorInfoProps): IBaseElement {
        const errors = params.error.errors
        const invalidPartsIndexes = errors.flatMap(error => error.payload?.errorPlace!)
        const invalidExpressionPartsIndexes = removeOverlappingRanges(invalidPartsIndexes)

        const highlightedErrors = new HighlightedErrors({
            expressionWithErrors: params.expressionWithError,
            errorRanges: invalidExpressionPartsIndexes,
            errors,
        })

        return highlightedErrors.element
    }

    private getErrorMessageBlock(params: IShowErrorInfoProps): IBaseElement {
        const message = params.error.errors[0].message
        const messageParagraph = new Paragraph({ text: message, id: 'result-display' })
        return messageParagraph
    }
}

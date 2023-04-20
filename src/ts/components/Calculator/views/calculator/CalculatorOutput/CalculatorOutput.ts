import { Paragraph } from '@components/Elements/Paragraph';
import { ICalculationErrors, IError, IErrorRange } from "exceptions/IErrors";
import { removeOverlappingRanges } from '@utilities/ranges/removeOverlappingRanges';
import { HighlightedErrors } from './HighlightedErrors';
import { IBaseElement } from '@components/Elements/interfaces';
import { WrapperElement } from '@components/Elements/ComplexElement';
import { ResultOutput } from './ResultParagraph';
import { ErrorType } from 'exceptions/error-type';


interface ICalculatorOutputParams {
    onErrorClick: (range: IErrorRange) => void
}

interface IShowErrorInfoProps {
    error: ICalculationErrors
    expressionWithError: string
}

interface IShowCalculationResultProps {
    result: number
    expression: string
}

type ErrorHandlers = Record<ErrorType, (params: IShowErrorInfoProps) => void>;

export class CalculatorOutput extends WrapperElement {
    private params: ICalculatorOutputParams;
    errorHandlers: ErrorHandlers;

    constructor(params: ICalculatorOutputParams) {
        super({
            wrapperClassNames: 'calculator__result',
        })
        this.params = params
        this.errorHandlers = {
            [ErrorType.RuntimeError]: this.renderMessage.bind(this),
            [ErrorType.UnexpectedError]: this.renderMessage.bind(this),
            [ErrorType.ValidationError]: this.showValidationError.bind(this)
        }
    }

    showCalculationResult(params: IShowCalculationResultProps): void {
        const resultOutput = new ResultOutput(params)
        this.appendOutputElement(resultOutput.element)
    }

    showErrorInfo(params: IShowErrorInfoProps): void {
        const errorHandler = this.errorHandlers[params.error.type]
        errorHandler(params)
    }

    private showValidationError(params: IShowErrorInfoProps): void {
        const errors = params.error.errors
        const invalidPartsIndexes = errors.flatMap(error => error.payload?.errorPlace!)
        const invalidExpressionPartsIndexes = removeOverlappingRanges(invalidPartsIndexes)

        const highlightedErrors = new HighlightedErrors({
            expressionWithErrors: params.expressionWithError,
            errorRanges: invalidExpressionPartsIndexes,
            errors,
            onErrorClick: this.params.onErrorClick
        })

        this.appendOutputElement(highlightedErrors.element)
    }

    private renderMessage(params: IShowErrorInfoProps): void {
        this.updateOutput()
        const message = params.error.errors[0].message
        const p = new Paragraph({ text: message, id: 'result-display' })
        this.wrapper.append(p)
    }

    private appendOutputElement(element: IBaseElement): void {
        this.updateOutput()
        this.wrapper.append(element)
    }

    private updateOutput(): void {
        this.wrapper.domElement.classList.add('visible')
        this.wrapper.removeElement('#result-display')
    }
}
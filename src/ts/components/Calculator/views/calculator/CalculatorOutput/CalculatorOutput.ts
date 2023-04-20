import { Paragraph } from '@components/Elements/Paragraph';
import { ICalculationErrors, IError, IErrorRange } from "@components/Calculator/interfaces/IErrors";
import { removeOverlappingRanges } from '@utilities/ranges/removeOverlappingRanges';
import { HighlightedErrors } from './HighlightedErrors';
import { IBaseElement } from '@components/Elements/interfaces';
import { WrapperElement } from '@components/Elements/ComplexElement';
import { ResultOutput } from './ResultParagraph';
import { ErrorType } from '@components/Calculator/interfaces/error-type';


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

    showErrorInfo(error: ICalculationErrors, expression: string): void {
        error.type === ErrorType.ValidationError ?
            this.showValidationError(error.errors, expression) :
            this.renderMessage(error.errors[0].message)
    }

    showCalculationResult(result: number, calculatedExpression: string): void {
        const resultOutput = new ResultOutput({
            expression: calculatedExpression,
            result
        })
        this.appendOutputElement(resultOutput.element)
    }

    private showValidationError(errors: IError[], expressionWithError: string): void {
        const invalidPartsIndexes = errors.flatMap(error => error.payload?.errorPlace!)
        const invalidExpressionPartsIndexes = removeOverlappingRanges(invalidPartsIndexes)

        const highlightedErrors = new HighlightedErrors({
            expressionWithErrors: expressionWithError,
            errorRanges: invalidExpressionPartsIndexes,
            errors,
            onErrorClick: this.params.onErrorClick
        })

        this.appendOutputElement(highlightedErrors.element)
    }

    private renderMessage(message: string): void {
        this.updateOutput()
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
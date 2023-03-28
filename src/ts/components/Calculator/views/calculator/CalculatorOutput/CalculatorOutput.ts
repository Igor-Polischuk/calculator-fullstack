import { ClassName } from '../ClassName';
import { Paragraph } from '@components/Elements/Paragraph';
import { IError } from "@components/Calculator/interfaces/ICalculator";
import { DivElement } from "@components/Elements/DivElement";
import { formatExpression } from '@utilities/formatText/formatExpression';
import { replaceMathOperators } from '@utilities/formatText/replaceMathOperators';
import { mergeRanges } from '@utilities/mergeRanges';
import { replaceSubstringsWithTags } from '@utilities/formatText/replaceSubstringsWithTags';

export class CalculatorOutput {
    private displayDiv: DivElement
    constructor() {
        this.displayDiv = new DivElement({ classNames: ClassName.CALCULATOR_RESULT })
    }

    get element() {
        return this.displayDiv
    }

    showCalculationResult(result: number, expression: string) {
        const resultText = `${replaceMathOperators(expression)} = <b>${result}</b>`
        this.renderParagraph({
            text: resultText,
            className: ClassName.SHOWUP_RESULT
        })
    }


    showCalculationError(errors: IError[], expressionWithError: string) {
        const invalidExpressionPartsIndexes = this.getInvalidExpressionPartsIndexes(errors)
        if (invalidExpressionPartsIndexes.length === 0) {
            this.renderParagraph({
                text: errors[0].message,
                className: ClassName.OUTPUT_ERROR
            })
            return
        }
        
        const formattedExpressionWithError = formatExpression(expressionWithError)
        const highlightedErrors = replaceSubstringsWithTags(formattedExpressionWithError, invalidExpressionPartsIndexes, 'span')

        this.renderParagraph({
            text: highlightedErrors,
            className: ClassName.OUTPUT_ERROR
        })
    }

    private getInvalidExpressionPartsIndexes(errors: IError[]) {
        const invalidPartsIndexes = errors.map(error => error.errorRange || []).flat()
        return mergeRanges(invalidPartsIndexes)

    }

    private renderParagraph(params: { text: string, className?: string }) {
        this.displayDiv.domElement.classList.add('visible')
        this.displayDiv.removeElement('p')
        const p = new Paragraph({ text: params.text, classNames: params.className })
        this.displayDiv.append(p)
    }
}
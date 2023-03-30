import { Paragraph } from '@components/Elements/Paragraph';
import { IError } from "@components/Calculator/interfaces/ICalculator";
import { DivElement } from "@components/Elements/DivElement";
import { formatExpression } from '@utilities/formatText/formatExpression';
import { replaceMathOperators } from '@utilities/formatText/replaceMathOperators';
import { mergeRanges } from '@utilities/mergeRanges';

export class CalculatorOutput {
    private outputWrapper: DivElement
    constructor() {
        this.outputWrapper = new DivElement({ classNames: 'calculator__result'})
    }

    get element() {
        return this.outputWrapper
    }

    showCalculationResult(result: number, expression: string) {
        const resultText = `${replaceMathOperators(expression)} = <b>${result}</b>`
        this.renderParagraph({
            text: resultText,
            className: 'result showup'
        })
    }


    showCalculationError(errors: IError[], expressionWithError: string) {
        const invalidExpressionPartsIndexes = this.getInvalidExpressionPartsIndexes(errors)
        if (invalidExpressionPartsIndexes.length === 0) {
            this.renderParagraph({
                text: errors[0].message,
                className: 'error'
            })
            return
        }
        
        const formattedExpressionWithError = formatExpression(expressionWithError)
        const highlightedErrors = this.wrapSubstringsInSpan(formattedExpressionWithError, invalidExpressionPartsIndexes)

        this.renderParagraph({
            text: highlightedErrors,
            className: 'error'
        })
    }

    private wrapSubstringsInSpan(str: string, indices: {from: number, to: number}[]): string {
        const { result } = indices.reduce(
          ({ result, offset }, {from, to}) => {
            console.log(from, to);
            
            const openTag = `<span>`;
            const closeTag = `</span>`;
            const replacement = openTag + str.slice(from, to + 1) + closeTag;
            return {
              result: result.slice(0, from + offset) + replacement + result.slice(to + 1 + offset),
              offset: offset + replacement.length - (to - from + 1),
            };
          },
          { result: str, offset: 0 }
        );
      
        return result;
      }

    private getInvalidExpressionPartsIndexes(errors: IError[]) {
        const invalidPartsIndexes = errors.map(error => error.errorPlace || []).flat()
        return mergeRanges(invalidPartsIndexes)

    }

    private renderParagraph(params: { text: string, className?: string }) {
        this.outputWrapper.domElement.classList.add('visible')
        this.outputWrapper.removeElement('p')
        const p = new Paragraph({ text: params.text, classNames: params.className })
        this.outputWrapper.append(p)
    }
}
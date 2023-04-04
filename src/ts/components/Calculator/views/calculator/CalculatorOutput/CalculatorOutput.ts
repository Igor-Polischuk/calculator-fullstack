import { Paragraph } from '@components/Elements/Paragraph';
import { IError } from "@components/Calculator/interfaces/ICalculator";
import { DivElement } from "@components/Elements/DivElement";
import { formatExpression } from '@utilities/formatText/formatExpression';
import { replaceMathOperators } from '@utilities/formatText/replaceMathOperators';
import { mergeRanges } from '@utilities/ranges/mergeRanges';
import { Span } from '@components/Elements/Span';

interface IHighlightErrorsReduce{
    offset: number
    lastErrorIndex: number
    spansArray: Span[]
}

export class CalculatorOutput {
    private outputWrapper: DivElement
    constructor() {
        this.outputWrapper = new DivElement({ classNames: 'calculator__result' })
    }

    get element() {
        return this.outputWrapper
    }

    showCalculationResult(result: number, calculatedExpression: string) {
        const resultText = `${replaceMathOperators(calculatedExpression)} = <b>${result}</b>`
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
        const highlightedErrors = this.highlightErrors(formattedExpressionWithError, invalidExpressionPartsIndexes)
        this.renderParagraph({
            className: 'error',
            children: highlightedErrors
        })
    }

    private highlightErrors(str: string, indices: { from: number, to: number }[]) {
        const { spansArray, lastErrorIndex } = indices.reduce<IHighlightErrorsReduce>(
            ({ offset, spansArray, lastErrorIndex }, { from, to }) => {
                const notErrorString = str.slice(lastErrorIndex, from)
                const notErrorSpan = new Span({ text: notErrorString })
                const errorString = str.slice(from, to + 1)
                const errorSpan = new Span({ text: errorString, classNames: 'error-span' })
                return {
                    offset: offset + errorString.length - (to - from + 1),
                    spansArray: [...spansArray, notErrorSpan, errorSpan],
                    lastErrorIndex: from + (to - from) + 1
                };
            }, { offset: 0, lastErrorIndex: 0, spansArray: [] });

        const lastStringPart = str.slice(lastErrorIndex + 1) 
        return [...spansArray, new Span({ text: lastStringPart})]
    }

    private getInvalidExpressionPartsIndexes(errors: IError[]) {
        const invalidPartsIndexes = errors.map(error => error.errorPlace || []).flat()
        return mergeRanges(invalidPartsIndexes)
    }

    private renderParagraph(params: { text?: string, className?: string, children?: Span[]}) {
        this.outputWrapper.domElement.classList.add('visible')
        this.outputWrapper.removeElement('p')
        const p = new Paragraph({ text: params.text || '', classNames: params.className })
        params.children && p.append(...params.children)
        this.outputWrapper.append(p)
    }
}
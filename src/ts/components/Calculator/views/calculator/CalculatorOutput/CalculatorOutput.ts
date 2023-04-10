import { IErrorRange } from './../../../interfaces/ICalculator';
import { Paragraph } from '@components/Elements/Paragraph';
import { IError } from "@components/Calculator/interfaces/ICalculator";
import { DivElement } from "@components/Elements/DivElement";
import { formatExpression } from '@utilities/formatText/formatExpression';
import { replaceMathOperators } from '@utilities/formatText/replaceMathOperators';
import { removeOverlappingRanges } from '@utilities/ranges/removeOverlappingRanges';
import { Span } from '@components/Elements/Span';

interface IHighlightErrorsReduce {
    lastErrorIndex: number
    spansArray: Span[]
}

interface ICalculatorOutputParams {
    onErrorClick: (range: IErrorRange) => void
}

export class CalculatorOutput {
    private outputWrapper: DivElement
    params: ICalculatorOutputParams;
    constructor(params: ICalculatorOutputParams) {
        this.params = params
        this.outputWrapper = new DivElement({ classNames: 'calculator__result' })
    }

    get element() {
        return this.outputWrapper
    }

    showCalculationResult(result: number, calculatedExpression: string) {
        const expressionSpan = new Span({ text: replaceMathOperators(calculatedExpression) })
        const equalSymbolSpan = new Span({ text: ' = ' })
        const resultSpan = new Span({ classNames: 'bold', text: result.toString() })
        this.renderParagraph({
            children: [expressionSpan, equalSymbolSpan, resultSpan],
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

    private highlightErrors(expression: string, indices: IErrorRange[]) {
        const { spansArray, lastErrorIndex } = indices.reduce<IHighlightErrorsReduce>(
            ({ spansArray, lastErrorIndex }, { from, to }) => {
                const notErrorString = expression.slice(lastErrorIndex, from)
                const notErrorSpan = new Span({ text: notErrorString })
                const errorString = expression.slice(from, to + 1)
                const errorSpan = new Span({ text: errorString, classNames: 'error-span' })
                errorSpan.onClick(() => this.params.onErrorClick({ from, to }))
                return {
                    spansArray: [...spansArray, notErrorSpan, errorSpan],
                    lastErrorIndex: from + (to - from) + 1
                };
            }, { lastErrorIndex: 0, spansArray: [] })

        return spansArray.concat(new Span({ text: expression.slice(lastErrorIndex) }))
    }

    private getInvalidExpressionPartsIndexes(errors: IError[]) {
        const invalidPartsIndexes = errors.flatMap(error => error.errorPlace || [])
        return removeOverlappingRanges(invalidPartsIndexes)
    }

    private renderParagraph(params: { text?: string, className?: string, children?: Span[] }) {
        this.outputWrapper.domElement.classList.add('visible')
        this.outputWrapper.removeElement('#result-display')
        const p = new Paragraph({ text: params.text || '', classNames: params.className, id: 'result-display' })
        params.children && p.append(...params.children)
        this.outputWrapper.append(p)
    }
}
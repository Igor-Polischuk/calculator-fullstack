import { Paragraph } from './../../../../Elements/Paragraph';
import { IError } from "@components/Calculator/interfaces/ICalculator";
import { DivElement } from "@components/Elements/DivElement";
import { formatExpression } from '@utilities/formatText/formatExpression';

export class CalculatorDisplay {
    private resultBlock: DivElement
    constructor() {
        this.resultBlock = new DivElement({ classNames: 'calculator__result' })
    }


    get element() {
        return this.resultBlock
    }

    renderCalculationResult(result: number | IError[], expression: string) {
        this.resultBlock.domElement.classList.add('visible')
        this.resultBlock.removeElement('p')
        if (typeof result === 'number') {
            this.renderResultNumber(result, expression)
        } else {
            this.renderError(result, expression)
        }
    }

    private renderResultNumber(result: number, expression: string) {
        const resultText = `${this.formatExpression(expression)} = <b>${result}</b>`
        const p = new Paragraph({ text: resultText, classNames: 'result showup' })
        this.resultBlock.append(p)
    }

    private renderError(errors: IError[], expressionWithError: string) {
        const indicesOfErrors = this.extractErrorValues(errors, 'errorIndex') as number[]
        const invalidExpressionParts = this.extractErrorValues(errors, 'invalidExpressionPart').flat() as string[]
        const formattedExpressionWithError = formatExpression(expressionWithError)
        const expressionWithIndexErrors = indicesOfErrors.reduce<string>((expressionChartsWithError, char) => {
            const errorIndexWrapper = `<span>${formattedExpressionWithError[char]}</span>`
            return this.replaceByIndex(expressionChartsWithError, char, errorIndexWrapper)
        }, formattedExpressionWithError)
        
        const expressionWithInvalidParts = invalidExpressionParts.reduce<string>((formattedExpressionPartWithError, incorrectPart) => {
            return this.replaceSubstringWithHTMLTag(formattedExpressionPartWithError, incorrectPart)
        }, expressionWithIndexErrors)
        
        const errorParagraph = new Paragraph({ text: expressionWithInvalidParts, classNames: 'error' })
        this.resultBlock.append(errorParagraph)
    }

    private extractErrorValues(errors: IError[], param: keyof IError['meta']): Array<number | string>{
        return errors.map(error => error.meta[param]).filter(item => item !== undefined) as Array<number | string>
    }

    private formatExpression(expression: string) {
        const FIND_POWER = /(\^(\d+|π|\([^()]*\)))/g;

        return expression
            .replace(/\*/g, '×')
            .replace(/\//g, '÷')
            .replace(/\-/g, '−')
            .replace(/\pi/g, 'π')
            .replace(/sqrt/g, '√')
            .replace(FIND_POWER, "<sup>$2</sup>")
    }

    private replaceSubstringWithHTMLTag(input: string, substring: string): string {
        const escapedSubstring = substring.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const tag = '<span>' + substring + '</span>';
        const regex = new RegExp(escapedSubstring, 'g');
        return input.replace(regex, tag);
    }

    private replaceByIndex(str: string, index: number, newStr: string) {
        return str.substring(0, index) + newStr + str.substring(index + 1);
    }
}
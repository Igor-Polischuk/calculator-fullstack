import { ClassName } from './../ClassName';
import { Paragraph } from '../../../../Elements/Paragraph';
import { IError } from "@components/Calculator/interfaces/ICalculator";
import { DivElement } from "@components/Elements/DivElement";
import { formatExpression } from '@utilities/formatText/formatExpression';
import { replaceByIndex } from '@utilities/formatText/replaceByIndex';
import { replaceString } from '@utilities/formatText/replaceString';
import { replaceMathOperators } from '@utilities/formatText/replaceMathOperators';

export class CalculatorOutput {
    private displayDiv: DivElement
    constructor() {
        this.displayDiv = new DivElement({ classNames: ClassName.CALCULATOR_RESULT })
    }

    get element() {
        return this.displayDiv
    }

    showCalculationResult(result: number, expression: string){
        const resultText = `${replaceMathOperators(expression)} = <b>${result}</b>`
        this.renderParagraph({
            text: resultText,
            className: ClassName.SHOWUP_RESULT
        })
    }


    showCalculationError(errors: IError[], expressionWithError: string){
        const indicesOfErrors = this.extractErrorValues(errors, 'errorIndex') as number[]
        const invalidExpressionParts = this.extractErrorValues(errors, 'invalidExpressionPart').flat() as string[]
        if (indicesOfErrors.length === 0 && invalidExpressionParts.length === 0) {
            this.renderParagraph({
                text: errors[0].message,
                className: ClassName.OUTPUT_ERROR
            })
            return
        }
        const formattedExpressionWithError = formatExpression(expressionWithError)
        const highlightedErrorsByIndex = this.highlightErrorByIndex(formattedExpressionWithError, indicesOfErrors)
        const highlightedErrorsInvalidParts = this.highlightErrorByInvalidParts(highlightedErrorsByIndex, invalidExpressionParts)

        this.renderParagraph({
            text: highlightedErrorsInvalidParts,
            className: ClassName.OUTPUT_ERROR
        })
    }


    private highlightErrorByIndex(expression: string, indices: number[]){
        const expressionWithIndexErrors = indices.reduce<string>((highlightedErrorsAcc, index) => {
            const errorIndexWrapper = `<span>${highlightedErrorsAcc[index]}</span>`
            return replaceByIndex({
                sourceString: highlightedErrorsAcc,
                index,
                replaceWith: errorIndexWrapper
            })
        }, expression)

        return expressionWithIndexErrors
    }


    private highlightErrorByInvalidParts(expression: string, parts: string[]){
        const expressionWithInvalidParts = parts.reduce<string>((highlightedErrorsAcc, part) => {
            return replaceString({
                sourceString: highlightedErrorsAcc,
                targetString: `<span>${part}</span>`,
                replacementString: part
            })            
        }, expression)

        return expressionWithInvalidParts
    }


    private renderParagraph(params: {text: string, className?: string}){
        this.displayDiv.domElement.classList.add('visible')
        this.displayDiv.removeElement('p')
        const p = new Paragraph({ text: params.text, classNames: params.className })
        this.displayDiv.append(p)
    }


    private extractErrorValues(errors: IError[], param: keyof IError['meta']): Array<number | string> {
        return errors.map(error => error.meta[param]).filter(item => item !== undefined) as Array<number | string>
    }
}
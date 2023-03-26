import { Paragraph } from './../../../../Elements/Paragraph';
import { IError } from "@components/Calculator/interfaces/ICalculator";
import { DivElement } from "@components/Elements/DivElement";

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
        const errorsIndex = this.extractErrorValues(errors, 'errorIndex') as number[]
        const incorrectParts = this.extractErrorValues(errors, 'invalidExpressionPart').flat() as string[]

        const errorStringByIndex = errorsIndex.reduce<string>((acc, char) => {
            const errorIndexWrapper = `<span>${expressionWithError[char]}</span>`
            return this.replaceByIndex(acc, char, errorIndexWrapper)
        }, expressionWithError)
        console.log(incorrectParts);
        
        const errorStringByParts = incorrectParts.reduce<string>((acc, incorrectPart) => {
            return this.replaceSubstringWithHTMLTag(acc, incorrectPart)
        }, errorStringByIndex)
        
        const p = new Paragraph({ text: errorStringByParts, classNames: 'error' })
        this.resultBlock.append(p)
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
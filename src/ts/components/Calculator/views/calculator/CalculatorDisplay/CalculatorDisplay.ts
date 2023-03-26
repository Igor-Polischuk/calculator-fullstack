import { Paragraph } from './../../../../Elements/Paragraph';
import { IError } from "@components/Calculator/interfaces/ICalculator";
import { DivElement } from "@components/Elements/DivElement";

export class CalculatorDisplay {
    private resultBlock: DivElement
    constructor() {
        this.resultBlock = new DivElement({ classNames: 'calculator__result' })
    }

    renderCalculationResult(result: number | IError[], expression: string) {
        this.resultBlock.domElement.classList.add('visible')
        this.resultBlock.removeElement('p')
        if (typeof result === 'number'){
            this.renderResultNumber(result, expression)
        }else{
            
        }
    }

    private renderResultNumber(result: number, expression: string){
        const resultText = `${this.formatExpression(expression)} = <b>${result}</b>`
        const p = new Paragraph({text: resultText, classNames: 'result showup'})
        this.resultBlock.append(p)
    }

    private renderError(errors: IError[], expressionWithError: string){

    }

    showError(errors: IError[], expressionWithError: string) {
        this.resultBlock.domElement.classList.add('visible')
        const errorWithDescription = errors.filter(errors => errors.meta.invalidExpressionPart)
        const errorText = errorWithDescription[0].meta.invalidExpressionPart
        const incorrectParts = errorText?.split('0').filter(symbol => symbol !== '')
        const html = incorrectParts?.reduce<string>((acc, error) => {
            return this.replaceSubstringWithHTMLTag(acc, error)
        }, expressionWithError)

        this.resultBlock.domElement.innerHTML = html || ''
    }

    get element() {
        return this.resultBlock
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
        const tag = '<span class="error">' + substring + '</span>';
        const regex = new RegExp(escapedSubstring, 'g');
        return input.replace(regex, tag);
    }

    private replaceByIndex(str: string, index: number, newStr: string) {
        return str.substring(0, index) + newStr + str.substring(index + 1);
    }
}
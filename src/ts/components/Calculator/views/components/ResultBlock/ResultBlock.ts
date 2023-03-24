import { IError } from "@components/Calculator/interfaces/ICalculator";
import { DivElement } from "@components/Elements/DivElement";

export class ResultBlock {
    private resultBlock = new DivElement({ classNames: ['calculator__result'] })
    constructor() {

    }

    showResult(result: number, expression: string) {
        this.resultBlock.domElement.classList.add('visible')
        const formattedExpression = this.formatExpression(expression)
        this.resultBlock.domElement.innerHTML = `<p class='showup'>${formattedExpression} = <b>${result}</b></p>`
    }

    showError(errors: IError[], expressionWithError: string){
        this.resultBlock.domElement.classList.add('visible') 
        const errorsIndex = errors.map(error => error.meta.errorIndex || []).flat()
        const errorsDescription = errors.map(error => error.meta.description || []).flat()

        const errorStringByIndex = errorsIndex.reduce<string>((acc, errorIndex) => {
            console.log(errorIndex);
            console.log(expressionWithError[errorIndex]);
            return this.replaceByIndex(acc, errorIndex, `<span class='error'>${expressionWithError[errorIndex]}</span>`)
        }, expressionWithError)
        this.resultBlock.domElement.innerHTML = errorStringByIndex

        if (errorsDescription.length > 0){
            this.resultBlock.domElement.innerHTML = `<span class='error'>Unresolved expression: ${errorsDescription[0]}</span>`
        }
        
    }

    get element() {
        return this.resultBlock
    }

    private formatExpression(expression: string) {
        const regex = /(\^(\d+|π|\([^()]*\)))/g;

        return expression
            .replace(/\*/g, '×')
            .replace(/\//g, '÷')
            .replace(/\-/g, '−')
            .replace(/\pi/g, 'π')
            .replace(/sqrt/g, '√')
            .replace(regex, "<sup>$2</sup>")
    }

    private replaceByIndex(str: string, index: number, newStr: string){
        return str.substring(0, index) + newStr + str.substring(index + 1);
    }
}
import { BlockElement } from "@components/Elements/BlockElement";

export class ResultBlock {
    private resultBlock = new BlockElement({ classNames: ['calculator__result'] })
    constructor() {

    }

    showResult(result: number, expression: string) {
        this.resultBlock.domEl.classList.add('visible')
        const formattedExpression = this.formatExpression(expression)
        this.resultBlock.domEl.innerHTML = `<p class='showup'>${formattedExpression} = <b>${result}</b></p>`
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
}
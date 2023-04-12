import { ComplexElement } from "@components/Elements/ComplexElement";
import { Span } from "@components/Elements/Span";
import { replaceMathOperators } from "@utilities/formatText/replaceMathOperators";

interface IResultParagraphParams {
    expression: string
    result: number
}

export class ResultOutput extends ComplexElement {
    constructor(params: IResultParagraphParams) {
        super({})
        const expressionSpan = new Span({ text: replaceMathOperators(params.expression) })
        const equalSymbolSpan = new Span({ text: ' = ' })
        const resultSpan = new Span({ classNames: 'bold', text: params.result.toString() })
        this.wrapper.append(expressionSpan, equalSymbolSpan, resultSpan)
    }
}
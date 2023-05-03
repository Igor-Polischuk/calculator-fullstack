import { WrapperElement } from "@components/Elements/WrapperElement";
import { Span } from "@components/Elements/Span";
import { replaceMathOperators } from "@utilities/formatText/replaceMathOperators";

interface IResultParagraphParams {
    expression: string
    result: number,
    classNames?: string
}

export class ResultOutput extends WrapperElement {
    constructor(params: IResultParagraphParams) {
        super({ wrapperClassNames: `result showup ${params.classNames}`, wrapperId: 'result-display' })
        const expressionSpan = new Span({ text: replaceMathOperators(params.expression) })
        const equalSymbolSpan = new Span({ text: ' = ' })
        const resultSpan = new Span({ classNames: 'bold', text: `${params.result}` })
        this.wrapper.append(expressionSpan, equalSymbolSpan, resultSpan)
    }
}
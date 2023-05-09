import { Span } from "@modules/Elements/Span";
import { replaceMathOperators } from "@utilities/formatText/replaceMathOperators";
import { Paragraph } from "@modules/Elements/Paragraph";

interface IResultParagraphParams {
    expression: string
    result: number,
    classNames?: string
}

export class ResultOutput extends Paragraph {
    constructor(params: IResultParagraphParams) {
        super({ classNames: `result showup ${params.classNames}`, id: 'result-display', text: '' })
        const expressionSpan = new Span({ text: replaceMathOperators(params.expression) })
        const equalSymbolSpan = new Span({ text: ' = ' })
        const resultSpan = new Span({ classNames: 'bold', text: `${params.result}` })
        this.append(expressionSpan, equalSymbolSpan, resultSpan)
    }
}
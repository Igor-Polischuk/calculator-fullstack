import { IHistoryFormat } from "@modules/Calculator/interfaces/ICalculatorAPI";
import { Paragraph } from "@modules/Elements/Paragraph";
import { Span } from "@modules/Elements/Span";
import { UnorderedList } from "@modules/Elements/UList";
import { replaceMathOperators } from "@utilities/formatText/replaceMathOperators";

interface IHistoryDisplayParams {
    onHistoryItemClick: (itemText: string) => void
    history: IHistoryFormat[]
}

export class HistoryDisplay extends UnorderedList {
    params: IHistoryDisplayParams;
    constructor(params: IHistoryDisplayParams) {
        super({
            classNames: 'history-block', id: 'history-content'
        })

        this.params = params

        this.appendHistoryItems(params.history)
    }

    private appendHistoryItems(history: IHistoryFormat[]) {
        history.forEach(({ expression, result }) => {
            const expressionBlock = new Paragraph({ text: replaceMathOperators(expression), classNames: 'history-item' })
            expressionBlock.onClick(() => this.params.onHistoryItemClick(expression))
            const separator = new Span({ text: '=' })
            const resultBlock = new Paragraph({ text: `${result}`, classNames: 'history-item' })
            resultBlock.onClick(() => this.params.onHistoryItemClick(result.toString()))
            this.appendListItem(expressionBlock, separator, resultBlock)
        })
    }
}
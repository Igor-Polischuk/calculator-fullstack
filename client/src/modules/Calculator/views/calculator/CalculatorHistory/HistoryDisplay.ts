import { IHistoryFormat, IHistoryItem } from "@modules/Calculator/interfaces/ICalculatorAPI";
import { Paragraph } from "common/Elements/Paragraph";
import { Span } from "common/Elements/Span";
import { UnorderedList } from "common/Elements/UList";
import { replaceMathOperators } from "@utilities/formatText/replaceMathOperators";

interface IHistoryDisplayParams {
    onHistoryItemClick: (itemText: string) => void
    history: IHistoryItem[]
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

    private appendHistoryItems(history: IHistoryItem[]) {
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
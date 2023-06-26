import { replaceMathOperators } from "@utilities/formatText/replaceMathOperators";
import { IHistoryItem } from "@common/api/IHistoryAPI";
import { Paragraph } from "@common/Elements/Paragraph";
import { UnorderedList } from "@common/Elements/UList";
import { Span } from "@common/Elements/Span";
import { cutText } from "@utilities/formatText/cutText";

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

        if (params.history.length > 0) {
            this.showHistoryList(params.history)
        } else {
            this.showEmptyHistoryMessage()
        }
    }

    private showEmptyHistoryMessage() {
        const message = new Paragraph({ text: 'No history items yet', classNames: 'history-empty' })
        this.append(message)
    }

    private showHistoryList(history: IHistoryItem[]) {
        history.forEach(({ expression, result }) => {
            const cutExpression = cutText(expression, 20)
            const expressionBlock = new Paragraph({ text: replaceMathOperators(cutExpression), classNames: 'history-item' })
            expressionBlock.onClick(() => this.params.onHistoryItemClick(expression))
            const separator = new Span({ text: '=' })
            const resultBlock = new Paragraph({ text: `${result}`, classNames: 'history-item' })
            resultBlock.onClick(() => this.params.onHistoryItemClick(result.toString()))
            this.appendListItem(expressionBlock, separator, resultBlock)
        })
    }
}
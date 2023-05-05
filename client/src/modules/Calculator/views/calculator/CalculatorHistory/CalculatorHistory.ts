import { WrapperElement } from "@modules/Elements/WrapperElement";
import { HistoryDisplay } from "./HistoryDisplay";

interface IHistoryFormat {
    expression: string
    result: number
}

interface ICalculatorHistoryParams {
    onHistoryItemClick: (itemText: string) => void
}

export class CalculatorHistory extends WrapperElement {
    private history: IHistoryFormat[] = []
    private params: ICalculatorHistoryParams

    constructor(params: ICalculatorHistoryParams) {
        super({
            wrapperClassNames: 'calculator__history'
        })

        this.params = params
    }

    updateHistory() {
        this.wrapper.removeElement('#history-content')
        const historyDisplay = new HistoryDisplay({
            history: this.history,
            onHistoryItemClick: this.params.onHistoryItemClick
        })
        historyDisplay.render(this.wrapper.domElement)
    }

    addHistoryItem(item: IHistoryFormat): void {
        this.history = [...this.history.slice(-4), item]
        this.updateHistory()
    }

    setHistory(history: IHistoryFormat[]): void {
        this.history = history.slice(-5)
        this.updateHistory()
    }
}
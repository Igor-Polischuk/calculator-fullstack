import { HistoryDisplay } from "./HistoryDisplay";
import { DivElement } from "common/Elements/DivElement";

interface IHistoryFormat {
    expression: string
    result: number
}

interface ICalculatorHistoryParams {
    onHistoryItemClick: (itemText: string) => void
}

export class CalculatorHistory extends DivElement {
    private history: IHistoryFormat[] = []
    private params: ICalculatorHistoryParams

    private visible = false

    constructor(params: ICalculatorHistoryParams) {
        super({
            classNames: 'calculator__history'
        })

        this.params = params
        this.wasClickedHistory()
    }

    showHistory() {
        this.domElement.classList.add('active')
        this.visible = true
    }

    hideHistory() {
        this.domElement.classList.remove('active')
        this.visible = false
    }

    wasClickedHistory() {
        window.addEventListener('click', (e) => {
            if (!this.visible) {
                return
            }

            const targetElement = e.target as HTMLElement;
            const isHistoryElement = targetElement.closest('.calculator__history');

            isHistoryElement || targetElement.classList.contains('history-icon')
                ? this.showHistory()
                : this.hideHistory()

        })
    }

    updateHistory() {
        this.removeElement('#history-content')
        const historyDisplay = new HistoryDisplay({
            history: this.history,
            onHistoryItemClick: (text: string) => {
                this.params.onHistoryItemClick(text)
                this.hideHistory()
            }
        })
        historyDisplay.render(this.domElement)
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
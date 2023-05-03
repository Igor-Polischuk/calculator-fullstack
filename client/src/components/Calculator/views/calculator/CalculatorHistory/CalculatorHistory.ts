import { WrapperElement } from "@components/Elements/WrapperElement";
import { ResultOutput } from "../CalculatorOutput/output-components/ResultParagraph";
import { callCalculatorApi } from "api/callCalculatorApi";
import { ApiEndpoint } from "api/api-endpoint";

interface IHistoryFormat {
    expression: string
    result: number
}

const fakeHistory = [{ "result": 15, "expression": "5*3" }, { "result": 89, "expression": "15*8-(4!)+(8-5*3)" }, { "result": 15, "expression": "8*3-9" }, { "result": 2, "expression": "1+1" }, { "result": -920, "expression": "56*3-4^3*(8-9*cos(pi))" }]

export class CalculatorHistory extends WrapperElement {
    constructor() {
        super({
            wrapperClassNames: 'calculator__history'
        })

        // this.fetchHistory()
        // this.showLastEnteredExpression(fakeHistory)
    }

    private showLastEnteredExpression(history: IHistoryFormat[]) {
        history.forEach(({ expression, result }) => {
            const historyItem = new ResultOutput({ expression, result, classNames: 'history-block' })
            this.wrapper.append(historyItem.element)
        })
    }

    private async fetchHistory() {
        const data = (await callCalculatorApi<{ history: IHistoryFormat[] }>({ endpoint: ApiEndpoint.History }))
        const history = data.data.history

        this.showLastEnteredExpression(history)
    }
}
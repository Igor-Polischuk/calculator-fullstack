import { DivElement } from "@components/Elements/DivElement";

export class CalculatorDetail{
    private detailWrapper: DivElement
    constructor(){
        this.detailWrapper = new DivElement({classNames: 'calculator__detail'})
    }

    get element() {
        return this.detailWrapper
    }
}
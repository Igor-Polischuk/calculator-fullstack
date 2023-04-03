import { IError } from "@components/Calculator/interfaces/ICalculator";
import { DivElement } from "@components/Elements/DivElement";
import { ListItem } from "@components/Elements/ListItem";
import { Paragraph } from "@components/Elements/Paragraph";
import { UnorderedList } from "@components/Elements/UList";

export class CalculatorDetail {
    private detailWrapper: DivElement
    constructor() {
        this.detailWrapper = new DivElement({ classNames: 'calculator__detail' })
    }

    get element() {
        return this.detailWrapper
    }

    showErrorsInfo(errors: IError[]) {
        this.detailWrapper.domElement.style.display = 'block'
        this.detailWrapper.removeElement('ul')
        const unorderedList = new UnorderedList({classNames: 'detail-error-info' })
        const errorsInfo = errors.flatMap(error => this.getErrors(error)).sort((error1, error2) => error1.index - error2.index)
        errorsInfo.forEach(error => {
            const errorWrapper = new ListItem({})
            const errorMessageP = new Paragraph({ text: `${error.message} by index:` })
            const errorIndexP = new Paragraph({ text: error.index.toString() })
            errorWrapper.append(errorMessageP, errorIndexP)
            unorderedList.append(errorWrapper)
        })

        this.detailWrapper.append(unorderedList)
    }

    hideDetail(){
        this.detailWrapper.domElement.style.display = 'none'
    }

    private getErrors(error: IError) {
        return error.errorPlace?.reduce<{ message: string, index: number }[]>((acc, indexes) => {
            return [...acc, { message: error.message, index: indexes.from }]
        }, []) || []
    }
}
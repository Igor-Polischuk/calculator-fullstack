import { IError } from "@components/Calculator/interfaces/ICalculator";
import { DivElement } from "@components/Elements/DivElement";
import { ListItem } from "@components/Elements/ListItem";
import { Paragraph } from "@components/Elements/Paragraph";
import { UnorderedList } from "@components/Elements/UList";

export class CalculatorDetail{
    private detailWrapper: DivElement
    constructor(){
        this.detailWrapper = new DivElement({classNames: 'calculator__detail'})
    }

    get element() {
        return this.detailWrapper
    }

    showErrorsInfo(errors: IError[], expression: string){
        this.detailWrapper.removeElement('ul')
        const unorderedList = new UnorderedList({})
        const errorsInfo = errors.flatMap(error => this.getErrors(error, expression));
        errorsInfo.forEach(error => {
            const errorWrapper= new ListItem({classNames: 'error-info'})
            const errorMessage = new Paragraph({text: `${error.message} by index ${error.index}`})
            errorWrapper.append(errorMessage)
            unorderedList.append(errorWrapper)
        })
        
        this.detailWrapper.append(unorderedList)
    }

    private getErrors(error: IError, expression: string){
        return error.errorPlace?.reduce<{message: string, index: number}[]>((acc, indexes) => {
            return [...acc, {message: error.message, index: indexes.from}]
        }, []) || []
    }
}
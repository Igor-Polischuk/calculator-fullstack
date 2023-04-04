import { IError } from "@components/Calculator/interfaces/ICalculator";
import { DivElement } from "@components/Elements/DivElement";
import { ListItem } from "@components/Elements/ListItem";
import { Paragraph } from "@components/Elements/Paragraph";
import { UnorderedList } from "@components/Elements/UList";

interface ErrorInfo {
    message: string;
    index: number;
}

interface ICalculatorDetailParams{
    onErrorClick: (start: number, end: number) => void
}

export class CalculatorDetail {
    private detailWrapper: DivElement
    params: ICalculatorDetailParams;
    constructor(params: ICalculatorDetailParams) {
        this.params = params
        this.detailWrapper = new DivElement({ classNames: 'calculator__detail' })
        const title = new Paragraph({ classNames: 'calculator__detail__title', text: 'Validation errors' })
        this.detailWrapper.append(title)
    }

    get element() {
        return this.detailWrapper
    }

    showErrorsInfo(errors: IError[]) {
        const errorsInfo = this.getErrorsInfo(errors);
        if (errorsInfo.length === 0){
            return
        }
        
        this.detailWrapper.domElement.style.display = 'block'
        this.detailWrapper.removeElement('ul')
        const unorderedList = new UnorderedList({ classNames: 'detail-error-info' })

        errorsInfo.forEach(({ message, index }) => {
            const listItem = new ListItem({})
            listItem.onClick(() => this.params.onErrorClick(index, index))
            const errorMessage = new Paragraph({ text: `${message} by index:` });
            const errorIndex = new Paragraph({ text: index.toString() });
            listItem.append(errorMessage, errorIndex);
            unorderedList.append(listItem)
        })

        this.detailWrapper.append(unorderedList)
    }

    hideDetail() {
        this.detailWrapper.domElement.style.display = 'none'
    }

    private getErrorsInfo(errors: IError[]): ErrorInfo[] {
        const errorsInfo = errors.reduce<ErrorInfo[]>((acc, { message, errorPlace = [] }) => {
            const errorInfos = errorPlace.map((place: { from: number, to: number }) => ({ message, index: place.to }));
            return [...acc, ...errorInfos];
        }, []);

        return [...errorsInfo].sort((error1, error2) => error1.index - error2.index)
    }
}
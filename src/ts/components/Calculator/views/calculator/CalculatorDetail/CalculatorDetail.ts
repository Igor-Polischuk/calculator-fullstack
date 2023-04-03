import { IError } from "@components/Calculator/interfaces/ICalculator";
import { DivElement } from "@components/Elements/DivElement";
import { ListItem } from "@components/Elements/ListItem";
import { Paragraph } from "@components/Elements/Paragraph";
import { UnorderedList } from "@components/Elements/UList";

interface ErrorInfo {
    message: string;
    index: number;
}

export class CalculatorDetail {
    private detailWrapper: DivElement
    constructor() {
        this.detailWrapper = new DivElement({ classNames: 'calculator__detail' })
        const title = new Paragraph({ classNames: 'calculator__detail__title', text: 'Validation errors' })
        this.detailWrapper.append(title)
    }

    get element() {
        return this.detailWrapper
    }

    showErrorsInfo(errors: IError[]) {
        const errorsInfo = this.getErrorsInfo(errors);
        
        this.detailWrapper.domElement.style.display = 'block'
        this.detailWrapper.removeElement('ul')
        const unorderedList = new UnorderedList({ classNames: 'detail-error-info' })

        errorsInfo.forEach(({ message, index }) => {
            const errorWrapper = new ListItem({})
            const errorMessage = new Paragraph({ text: `${message} by index:` });
            const errorIndex = new Paragraph({ text: index.toString() });
            errorWrapper.append(errorMessage, errorIndex);
            unorderedList.append(errorWrapper)
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
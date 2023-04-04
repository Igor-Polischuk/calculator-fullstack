import { IError } from "@components/Calculator/interfaces/ICalculator";
import { DivElement } from "@components/Elements/DivElement";
import { ListItem } from "@components/Elements/ListItem";
import { Paragraph } from "@components/Elements/Paragraph";
import { UnorderedList } from "@components/Elements/UList";

interface IFormattedErrorsInfo {
    message: string;
    index: number;
}

interface ICalculatorDetailParams{
    onErrorClick: (start: number, end: number) => void
}

export class CalculatorErrorsDetails {
    private errorDetailsWrapper: DivElement
    params: ICalculatorDetailParams;
    constructor(params: ICalculatorDetailParams) {
        this.params = params
        this.errorDetailsWrapper = new DivElement({ classNames: 'calculator__detail' })
        const title = new Paragraph({ classNames: 'calculator__detail__title', text: 'Validation errors' })
        this.errorDetailsWrapper.append(title)
    }

    get element() {
        return this.errorDetailsWrapper
    }

    showErrorsInfo(errors: IError[]) {
        const formattedErrors = this.formatErrors(errors);
        if (formattedErrors.length === 0){
            return
        }
        
        this.errorDetailsWrapper.domElement.classList.add('show')
        this.errorDetailsWrapper.removeElement('#detail-list')
        const unorderedList = new UnorderedList({ classNames: 'detail-error-info', id: 'detail-list' })

        const listItemsArray = this.getListItems(formattedErrors)
        unorderedList.append(...listItemsArray)
        this.errorDetailsWrapper.append(unorderedList)
    }

    hideDetail() {
        this.errorDetailsWrapper.domElement.classList.remove('show')
    }

    private getListItems(formattedErrors: IFormattedErrorsInfo[]){
        return formattedErrors.map(({ message, index }) => {
            const errorMessage = new Paragraph({ text: `${message} by index:` })
            const errorIndex = new Paragraph({ text: index.toString() })
            const listItem = new ListItem({})

            listItem.append(errorMessage, errorIndex);
            listItem.onClick(() => this.params.onErrorClick(index, index))

            return listItem
        })
    }

    private formatErrors(errors: IError[]): IFormattedErrorsInfo[] {
        const formattedErrors  = errors.reduce<IFormattedErrorsInfo[]>((formattedErrors , { message, errorPlace }) => {
            const errorInfos = errorPlace!.map((place) => ({ message, index: place.to }));
            return [...formattedErrors , ...errorInfos];
        }, []);

        return [...formattedErrors ].sort((error1, error2) => error1.index - error2.index)
    }
}
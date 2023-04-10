import { IError, IErrorRange } from "@components/Calculator/interfaces/ICalculator";
import { DivElement } from "@components/Elements/DivElement";
import { Paragraph } from "@components/Elements/Paragraph";
import { Span } from "@components/Elements/Span";
import { UnorderedList } from "@components/Elements/UList";

interface IFormattedErrorsInfo {
    message: string;
    indexes: {
        from: number;
        to: number;
    };
}

interface IShowErrorInfoParams {
    errors: IError[]
    invalidExpression: string
}

interface ICalculatorDetailParams {
    onErrorClick: (errorRange: IErrorRange) => void
}

export class CalculatorErrorsDetails {
    private errorDetailsWrapper: DivElement
    private params: ICalculatorDetailParams;
    constructor(params: ICalculatorDetailParams) {
        this.params = params
        this.errorDetailsWrapper = new DivElement({ classNames: 'calculator__detail' })
        const title = new Paragraph({ classNames: 'calculator__detail__title', text: 'Validation errors' })
        this.errorDetailsWrapper.append(title)
    }

    get element() {
        return this.errorDetailsWrapper
    }

    showErrorsInfo({ errors, invalidExpression }: IShowErrorInfoParams) {
        const formattedErrors = this.formatErrors(errors);
        if (formattedErrors.length === 0) {
            return
        }

        this.errorDetailsWrapper.domElement.classList.add('show')
        this.errorDetailsWrapper.removeElement('#detail-list')
        const unorderedList = new UnorderedList({ classNames: 'detail-error-info', id: 'detail-list' })

        const listItemsArray = this.getErrorsParagraph(formattedErrors, invalidExpression)
        unorderedList.appendListItems(listItemsArray)
        this.errorDetailsWrapper.append(unorderedList)
    }

    hideDetail() {
        this.errorDetailsWrapper.domElement.classList.remove('show')
    }

    private getErrorsParagraph(formattedErrors: IFormattedErrorsInfo[], invalidedExpression: string) {
        return formattedErrors.map(({ message, indexes }) => {
            const invalidString = invalidedExpression.substring(indexes.from, indexes.to + 1)
            const errorMessage = new Span({ text: `${message}:` })
            const errorSubstring = new Span({ text: invalidString, classNames: 'bold' })
            const errorParagraph = new Paragraph({ text: '' })
            errorParagraph.append(errorMessage, errorSubstring)
            errorParagraph.onClick(() => this.params.onErrorClick(indexes))
            return errorParagraph
        })
    }

    private formatErrors(errors: IError[]): IFormattedErrorsInfo[] {
        const formattedErrors = errors.reduce<IFormattedErrorsInfo[]>((formattedErrors, { message, errorPlace }) => {
            if (errorPlace) {
                const errorInfos = errorPlace.map((place) => ({ message, indexes: { from: place.from, to: place.to } }));
                return [...formattedErrors, ...errorInfos];
            }
            return formattedErrors
        }, []);

        return [...formattedErrors].sort((error1, error2) => error1.indexes.from - error2.indexes.from)
    }
}
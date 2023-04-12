import { ErrorMessage } from './ErrorMessage';
import { IError, IErrorRange } from "@components/Calculator/interfaces/ICalculator";
import { ComplexElement } from "@components/Elements/ComplexElement";
import { Paragraph } from "@components/Elements/Paragraph";
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

export class CalculatorErrorsDetails extends ComplexElement {
    private params: ICalculatorDetailParams;
    constructor(params: ICalculatorDetailParams) {
        super({
            wrapperClassNames: 'calculator__detail'
        })
        this.params = params
        const title = new Paragraph({ classNames: 'calculator__detail__title', text: 'Validation errors' })
        this.wrapper.append(title)
    }

    showErrorsInfo({ errors, invalidExpression }: IShowErrorInfoParams) {
        const formattedErrors = this.formatErrors(errors);
        if (formattedErrors.length === 0) {
            return
        }

        this.showDetail()
        this.wrapper.removeElement('#detail-list')
        const unorderedList = new UnorderedList({ classNames: 'detail-error-info', id: 'detail-list' })

        const listItemsArray = this.getErrorsParagraph(formattedErrors, invalidExpression)
        unorderedList.appendListItems(listItemsArray)
        this.wrapper.append(unorderedList)
    }

    hideDetail() {
        this.wrapper.domElement.classList.remove('show')
    }

    showDetail() {
        this.wrapper.domElement.classList.add('show')
    }

    private getErrorsParagraph(formattedErrors: IFormattedErrorsInfo[], invalidedExpression: string) {
        return formattedErrors.map(({ message, indexes }) => {
            const invalidString = invalidedExpression.substring(indexes.from, indexes.to + 1)
            const errorMessage = new ErrorMessage({
                errorMessage: message,
                errorSubstring: invalidString,
                onErrorClick: () => this.params.onErrorClick(indexes)
            })
            return errorMessage.element
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
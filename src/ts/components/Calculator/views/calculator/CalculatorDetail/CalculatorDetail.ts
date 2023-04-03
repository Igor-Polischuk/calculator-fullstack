import { IError } from "@components/Calculator/interfaces/ICalculator";
import { DivElement } from "@components/Elements/DivElement";
import { Paragraph } from "@components/Elements/Paragraph";

export class CalculatorDetail{
    private detailWrapper: DivElement
    constructor(){
        this.detailWrapper = new DivElement({classNames: 'calculator__detail'})
    }

    get element() {
        return this.detailWrapper
    }

    showErrorsInfo(errors: IError[], expression: string){
        const errorsInfo = errors.flatMap(error => this.getErrors(error, expression));
        errorsInfo.forEach(error => {
            const errorDiv = new DivElement({classNames: 'error-info'})
            const errorMessage = new Paragraph({text: `${error.message} by index ${error.index}`})
            errorDiv.append(errorMessage)
            this.detailWrapper.append(errorDiv)
        })
        
        
    }

    private getErrors(error: IError, expression: string){
        return error.errorPlace?.reduce<{message: string, index: number}[]>((acc, indexes) => {
            return [...acc, {message: error.message, index: indexes.from}]
        }, []) || []
    }
}
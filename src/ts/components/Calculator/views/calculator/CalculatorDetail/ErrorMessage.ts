import { ComplexElement } from "@components/Elements/ComplexElement";
import { Paragraph } from "@components/Elements/Paragraph";
import { Span } from "@components/Elements/Span";

interface IErrorMessageParams {
    onErrorClick: () => void
    errorMessage: string
    errorSubstring: string
}

export class ErrorMessage extends ComplexElement {
    constructor(params: IErrorMessageParams) {
        super({})
        const errorMessage = new Span({ text: `${params.errorMessage}:` })
        const errorSubstring = new Span({ text: params.errorSubstring, classNames: 'bold' })
        this.wrapper.append(errorMessage, errorSubstring)
        this.wrapper.onClick(params.onErrorClick)
    }
}
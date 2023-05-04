import { WrapperElement } from "@modules/Elements/WrapperElement";
import { Paragraph } from "@modules/Elements/Paragraph";
import { IShowErrorInfoProps } from "../CalculatorOutput";

export class ErrorMessage extends WrapperElement {
    constructor(params: IShowErrorInfoProps) {
        super()
        const text = params.error.message
        const paragraph = new Paragraph({ text, id: 'result-display' })
        this.wrapper.append(paragraph)
    }
}
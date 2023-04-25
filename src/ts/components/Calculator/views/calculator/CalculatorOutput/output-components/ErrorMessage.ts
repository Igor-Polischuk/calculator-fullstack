import { WrapperElement } from "@components/Elements/WrapperElement";
import { Paragraph } from "@components/Elements/Paragraph";
import { IShowErrorInfoProps } from "../CalculatorOutput";

export class ErrorMessage extends WrapperElement {
    constructor(params: IShowErrorInfoProps) {
        super()
        const text = params.error.errors[0].message
        const paragraph = new Paragraph({ text, id: 'result-display' })
        this.wrapper.append(paragraph)
    }
}
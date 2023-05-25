import { Paragraph } from "common/Elements/Paragraph";
import { IShowErrorInfoProps } from "../CalculatorOutput";

export class ErrorMessage extends Paragraph {
    constructor(params: IShowErrorInfoProps) {
        const text = params.error.message
        super({ text, id: 'result-display' })
    }
}
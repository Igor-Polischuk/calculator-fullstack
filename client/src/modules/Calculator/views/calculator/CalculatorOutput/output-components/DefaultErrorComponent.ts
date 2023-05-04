import { Paragraph } from "@modules/Elements/Paragraph";
import { WrapperElement } from "@modules/Elements/WrapperElement";

export class DefaultErrorComponent extends WrapperElement {
    private default_text = 'Unknown error type'

    constructor() {
        super()
        const paragraph = new Paragraph({ text: this.default_text })
        this.wrapper.append(paragraph)
    }
}
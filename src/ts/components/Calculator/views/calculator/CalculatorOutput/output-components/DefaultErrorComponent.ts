import { Paragraph } from "@components/Elements/Paragraph";
import { WrapperElement } from "@components/Elements/WrapperElement";

export class DefaultErrorComponent extends WrapperElement {
    private default_text = 'Unknown error type'

    constructor() {
        super()
        const paragraph = new Paragraph({ text: this.default_text })
        this.wrapper.append(paragraph)
    }
}
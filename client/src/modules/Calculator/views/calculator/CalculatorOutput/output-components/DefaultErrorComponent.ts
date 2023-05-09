import { Paragraph } from "@modules/Elements/Paragraph";

export class DefaultErrorComponent extends Paragraph {
    constructor() {
        super({ text: 'Unknown error type' })
    }
}
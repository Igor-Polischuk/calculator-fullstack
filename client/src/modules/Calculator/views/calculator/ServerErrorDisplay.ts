import { DivElement } from "common/Elements/DivElement";
import { Paragraph } from "common/Elements/Paragraph";
import { IAppError } from "common/AppError/IAppError";

export class ServerErrorDisplay extends DivElement {
    constructor(error: IAppError) {
        super({ classNames: 'server-error' })

        const messageParagraph = new Paragraph({ text: 'Internal server error' })
        const hintParagraph = new Paragraph({ text: 'Please try later' })

        this.append(messageParagraph, hintParagraph)

    }
}
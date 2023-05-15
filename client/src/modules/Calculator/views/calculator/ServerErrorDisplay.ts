import { DivElement } from "@modules/Elements/DivElement";
import { Paragraph } from "@modules/Elements/Paragraph";
import { IAppError } from "errors/AppError";

export class ServerErrorDisplay extends DivElement {
    constructor(error: IAppError) {
        super({ classNames: 'server-error' })

        const messageParagraph = new Paragraph({ text: 'Internal server error' })
        const hintParagraph = new Paragraph({ text: 'Please try later' })

        this.append(messageParagraph, hintParagraph)

    }
}
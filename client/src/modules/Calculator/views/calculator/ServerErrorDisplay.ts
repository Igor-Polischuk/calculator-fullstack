import { DivElement } from "common/Elements/DivElement";
import { Paragraph } from "common/Elements/Paragraph";
import { IAppError } from "common/AppError/IAppError";
import { logger } from "@common/Logger/Logger";

export class ServerErrorDisplay extends DivElement {
    constructor(error: IAppError) {
        super({ classNames: 'server-error' })

        logger.addLog('error', `Show server-error block`, error)

        const messageParagraph = new Paragraph({ text: 'Internal server error' })
        const hintParagraph = new Paragraph({ text: 'Please try later' })

        this.append(messageParagraph, hintParagraph)

    }
}
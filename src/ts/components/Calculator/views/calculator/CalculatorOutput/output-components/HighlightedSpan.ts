import { Span } from "@components/Elements/Span";
import { uppercaseFirstLetter } from "@utilities/formatText/upercaseFirstLetter";
import { IErrorRange } from "errors/IErrors";

interface IHighlightedSpanProps {
    text: string
    titleAtrText: string
    onClick: () => void
}

export class HighlightedSpan extends Span {
    constructor({ titleAtrText, text, onClick }: IHighlightedSpanProps) {
        super({
            classNames: 'error-span',
            text
        })

        this.domElement.title = uppercaseFirstLetter(titleAtrText)
        this.onClick(() => onClick())
    }
}
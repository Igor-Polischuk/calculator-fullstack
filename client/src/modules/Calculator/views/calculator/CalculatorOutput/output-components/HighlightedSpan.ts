import { Span } from "common/Elements/Span";
import { uppercaseFirstLetter } from "@utilities/formatText/uppercaseFirstLetter";

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
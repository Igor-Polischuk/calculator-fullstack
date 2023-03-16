export interface IMyElementConfig {
    parentNode?: Element,
    classNames?: string[]
}

export interface IMyElement {
    domEl: Element,
    insert: (parentNode: Element) => void
}
export interface IButton extends IMyElement {
    onClick: (callback: (e: MouseEvent) => void) => void
    metaData: Record<string, string>
}

export interface IInput extends IMyElement {
    onInput: (callback: (e: Event) => void) => void
    value: string
}

export interface IBlockElement extends IMyElement{
    append: (...elements: IMyElement[]) => void
}

export interface IBlockElement extends IMyElement{
    
}
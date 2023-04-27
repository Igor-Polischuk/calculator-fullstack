export interface IBaseElementParams {
    parentNode?: Element,
    classNames?: string
    id?: string
}

export interface IBaseElement {
    domElement: Element,
    childElements: IBaseElement[]
    append: (...elements: IBaseElement[]) => void
    render: (parentNode: Element) => void
    onClick: (callback: (e: Event) => void) => void
}
export interface IButton extends IBaseElement {
    metaData: Record<string, string>
    type: string
}

export interface IInput extends IBaseElement {
    onInput: (callback: (e: Event) => void) => void
    value: string
}

export interface IDivElement extends IBaseElement {
    removeElement: (selector: string) => void
}

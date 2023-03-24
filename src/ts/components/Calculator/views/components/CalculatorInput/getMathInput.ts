import { Input } from "../../../../Elements/Input"

export function getMathInput(){
    const standardClasses = 'calculator__input'
    const input = new Input({
        classNames: standardClasses,
        placeholder: 'Enter what you want to calculate',
    })

    return input
}
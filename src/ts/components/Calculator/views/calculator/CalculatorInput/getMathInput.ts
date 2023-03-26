import { Input } from "@components/Elements/Input"

export function getMathInput(){
    const inputClasses = 'calculator__input'
    const input = new Input({
        classNames: inputClasses,
        placeholder: 'Enter what you want to calculate',
    })

    return input
}
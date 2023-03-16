import { Input } from "../../Elements/Input"

export function getMathInput(){
    const standartClasses = ['calculator__input']
    const input = new Input({
        classNames: standartClasses,
        placeholder: 'Enter what you want to calculate',
    })

    return input
}
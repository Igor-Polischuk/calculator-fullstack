import { Input } from "@components/Elements/Input"
export function getMathInput(){
    const input = new Input({
        classNames: 'calculator__input',
        placeholder: 'Enter what you want to calculate',
    })

    return input
}
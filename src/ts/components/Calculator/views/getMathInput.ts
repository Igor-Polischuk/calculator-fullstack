import { Input } from "./Elements/Input"

export function getMathInput(){
    const parentNode = document.querySelector('.calculator__field')!
    const standartClasses = ['calculator__input']
    const input = new Input({
        parentNode,
        classNames: standartClasses,
        placeholder: 'Enter what you want to calculate',
    })

    return input
}
import { DivElement } from "@components/Elements/DivElement";
import { Input } from "@components/Elements/Input";
import { getMathInput } from "./getMathInput";

export class CalculatorInput {
    private input: Input
    private inputWrapper: DivElement
    constructor() {
        this.input = getMathInput()
        this.inputWrapper = new DivElement({ classNames: 'calculator__field' })
        this.inputWrapper.append(this.input)
    }

    get element() {
        return this.inputWrapper
    }

    get inputText() {
        return this.input.value
    }

    setInputValue(newValue: string) {
        this.input.value = newValue
    }
}
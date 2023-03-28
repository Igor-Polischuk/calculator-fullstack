import { DivElement } from "@components/Elements/DivElement";
import { Input } from "@components/Elements/Input";
import { ClassName } from "../ClassName";
import { getMathInput } from "./getMathInput";

export class CalculatorInput {
    private input: Input
    private inputWrapper: DivElement
    constructor() {
        this.input = getMathInput()
        this.inputWrapper = new DivElement({ classNames: ClassName.CALCULATOR_FIELD })
        this.inputWrapper.append(this.input)
    }

    get element() {
        return this.inputWrapper
    }

    get inputText() {
        return this.input.value
    }

    setInputValue(callback: (currentInputValue: string) => string) {
        const newValue = callback(this.input.value)
        this.input.value = newValue
    }
}
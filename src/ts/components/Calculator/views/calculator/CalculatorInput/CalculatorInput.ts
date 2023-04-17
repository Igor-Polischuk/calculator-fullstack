import { WrapperElement } from "@components/Elements/ComplexElement";
import { Input } from "@components/Elements/Input";
import { formatExpression } from "@utilities/formatText/formatExpression";

export class CalculatorInput extends WrapperElement {
    private input: Input
    constructor() {
        super({
            wrapperClassNames: 'calculator__field'
        })
        this.input = new Input({
            classNames: 'input',
            value: '0'
        })

        this.wrapper.append(this.input)
        this.input.onInput(() => { this.input.domElement.value = formatExpression(this.input.value) })
    }

    get inputElement() {
        return this.input.domElement
    }

    get inputText() {
        return this.input.value
    }

    setInputValue(newValue: string) {
        this.input.value = newValue
    }
}
import { ComplexElement } from "@components/Elements/ComplexElement";
import { Input } from "@components/Elements/Input";
import { formatExpression } from "@utilities/formatText/formatExpression";

export class CalculatorInput extends ComplexElement {
    private input: Input
    constructor() {
        super({
            wrapperClassNames: 'calculator__field'
        })
        this.input = new Input({
            classNames: 'input',
            placeholder: 'Enter what you want to calculate',
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
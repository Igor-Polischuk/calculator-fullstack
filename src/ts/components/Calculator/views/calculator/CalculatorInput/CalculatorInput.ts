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
        this.input.onInput(() => {
            this.input.domElement.value = formatExpression(this.input.value)
            this.input.domElement.scrollLeft = this.input.domElement.scrollWidth
        })
    }

    get inputElement(): HTMLInputElement {
        return this.input.domElement
    }

    get inputText(): string {
        return this.input.value
    }

    setInputValue(newValue: string): void {
        this.input.value = newValue
    }
}
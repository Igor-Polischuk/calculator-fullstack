import { WrapperElement } from "@components/Elements/WrapperElement";
import { Input } from "@components/Elements/Input";
import { formatExpression } from "@utilities/formatText/formatExpression";

export class CalculatorInput extends WrapperElement {
    private input: Input
    constructor() {
        super({
            wrapperClassNames: 'calculator__field'
        })
        this.input = new Input({
            classNames: 'math-input',
            placeholder: '0'
        })

        this.wrapper.append(this.input)
        this.input.onInput(this.handleInputChange.bind(this))
    }

    get inputElement(): Input {
        return this.input
    }

    get inputText(): string {
        return this.input.value
    }

    setInputValue(newValue: string): void {
        this.input.value = newValue
    }

    private handleInputChange(): void {
        this.input.domElement.value = formatExpression(this.input.value)
        this.input.domElement.scrollLeft = this.input.domElement.scrollWidth
    }
}
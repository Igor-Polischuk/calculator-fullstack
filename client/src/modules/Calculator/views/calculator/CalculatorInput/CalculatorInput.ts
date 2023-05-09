import { Input } from "@modules/Elements/Input";
import { formatExpression } from "@utilities/formatText/formatExpression";
import { DivElement } from "@modules/Elements/DivElement";

export class CalculatorInput extends DivElement {
    private input: Input
    constructor() {
        super({
            classNames: 'calculator__field'
        })
        this.input = new Input({
            classNames: 'math-input',
            placeholder: '0'
        })

        this.append(this.input)
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
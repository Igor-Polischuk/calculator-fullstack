import { DivElement } from "@components/Elements/DivElement";
import { getMathInput } from "./getMathInput";

export class CalculatorInput{
    private className = 'calculator__field'
    private input = getMathInput()
    private inputBlock = new DivElement({ classNames: this.className })

    constructor (){
        this.inputBlock.append(this.input)
    }

    get element(){
        return this.inputBlock
    }

    get inputText(){
        return this.input.value
    }

    update(newInputValue: string){
        this.input.value = newInputValue
    }
}
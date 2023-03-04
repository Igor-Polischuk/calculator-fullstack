import { ICalculatorController, ICalculatorModel } from "@components/Calculator/types/ICalculator";
import { CalculatorObserverEvent } from "../calculator-event";
import { calculatorCongig, Priority } from "./calculator-config";
import { checkBrackets } from "./helpers/checkBrackets";

export class CalculatorController implements ICalculatorController {
    private calculatorCongig = calculatorCongig
    constructor(public model: ICalculatorModel) {
        this.model.subscribe(CalculatorObserverEvent.Expression, (expression) => {
            this.calculate(expression);
        })
    }

    private calculate(exp: string) {
        let expression = exp.replace(/\s/g, '')
        // console.log(expression);
        if (!checkBrackets(expression)) throw new Error('Incorrect order of brackets')

        this.getResult('2+2*2')
        this.getResult('1*2+3+4*6')
    }

    getResult(expression: string) {
        console.log(expression);
        
        const actionsExp = new RegExp(Object.keys(calculatorCongig).map(i => `\\${i}`).join('|'), 'g')
        const actionsQueue = expression.match(actionsExp)
        const queueByPrecedence = actionsQueue?.reduce<{[precedence: number]: string[]}>((obj, action) => {
            const currentPriority = this.calculatorCongig[action].priority
            obj[currentPriority] ? obj[currentPriority].push(action) : obj[currentPriority] = [action]
            return obj
        }, {})
        console.log(queueByPrecedence);
        
        let res = expression
        if(queueByPrecedence){
            queueByPrecedence[Priority.Hight]?.forEach(action => {
                res = this.calculatorCongig[action].doAction(res)
                
            })
            queueByPrecedence[Priority.Medium]?.forEach(action => {
                res = this.calculatorCongig[action].doAction(res)
                
            })
            queueByPrecedence[Priority.Low]?.forEach(action => {
                res = this.calculatorCongig[action].doAction(res)
                
            })
        }

        
    }

}
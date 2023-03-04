import { ICalculatorController, ICalculatorModel } from "@components/Calculator/types/ICalculator";
import { CalculatorObserverEvent } from "../calculator-event";
import { calculatorCongig, Priority } from "./calculator-config";
import { checkBrackets, getExpressionsFromBrackets } from "./helpers/checkBrackets";

export class CalculatorController implements ICalculatorController {
    private calculatorCongig = calculatorCongig
    constructor(public model: ICalculatorModel) {
        this.model.subscribe(CalculatorObserverEvent.Expression, (expression) => {
            const result = this.calculate(expression);
            console.log(result);
            
            model.setResult(result)
        })
    }
    //8 + 2 * (3 + (5 - 3)) - 10 / 2 * (6 - 4)
    private calculate(exp: string) {
        let expression = exp.replace(/\s/g, '')
        if (!checkBrackets(expression)) throw new Error('Incorrect order of brackets')
        const expressionsInBrackets = getExpressionsFromBrackets(expression)
        console.log(expression);
        console.log(expressionsInBrackets);
        
        expressionsInBrackets.forEach(bracketExpression => {
            const resOfExpresiionInBrackets = this.calculate(bracketExpression)
            expression = expression.replace(`(${bracketExpression})`, resOfExpresiionInBrackets.toString())
        })
        return +this.getResult(expression)
    }

    getResult(expression: string) {
        const actionsExp = new RegExp(Object.keys(calculatorCongig).map(i => `\\${i}`).join('|'), 'g')
        const actionsQueue = expression.match(actionsExp)
        const queueByPrecedence = actionsQueue?.reduce<{[precedence: number]: string[]}>((obj, action) => {
            const currentPriority = this.calculatorCongig[action].priority
            obj[currentPriority] ? obj[currentPriority].push(action) : obj[currentPriority] = [action]
            return obj
        }, {})
        
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

        return res
    }

}
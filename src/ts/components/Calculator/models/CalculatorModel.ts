import { IError } from '../interfaces/ICalculator';
import { CalculatorModelEvent} from "../calculator-event";
import { Observer } from "@utilities/Observer/Observer";
import { ModelAllowedEvents, ICalculatorModel } from "../interfaces/ICalculator";


export class CalculatorModel extends Observer<ModelAllowedEvents> implements ICalculatorModel{
    private result: number | null = null;
    private expression: string | null = null;
    private error: IError[] = [];

    setResult(res: number) {
        this.result = res;
        this.error = []
        this.notifyAll(CalculatorModelEvent.ResultChanged, res)
    }

    setExpression(expression: string) {
        this.expression = expression;
        this.notifyAll(CalculatorModelEvent.ExpressionChanged, expression)
    }

    setError(errors: IError[]){
        this.error = errors
        this.result = null
        this.notifyAll(CalculatorModelEvent.ErrorChanged, errors)
    }
}
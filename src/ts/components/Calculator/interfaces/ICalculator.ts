import { IObserver } from "@utilities/Observer/IObserver"
import { CalculatorModelEvent } from "../calculator-model-event";
import { ICalculationErrors } from "../../../exceptions/IErrors";

export type ModelAllowedEvents = {
    [CalculatorModelEvent.ResultChanged]: number;
    [CalculatorModelEvent.ExpressionChanged]: string;
    [CalculatorModelEvent.ErrorChanged]: ICalculationErrors
};

export interface ICalculatorModel extends IObserver<ModelAllowedEvents> {
    setResult: (result: number) => void
    setExpression: (expression: string) => void
    setError: (errors: ICalculationErrors) => void
    getExpression: () => string | null
}

export interface ICalculatorView { }

export interface ICalculatorController { }

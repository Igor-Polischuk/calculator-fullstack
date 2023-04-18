/**
 * function receives a float number and returns a number with no more than n decimal places
 */
export function formatDecimal(target: number, n = 2): number {
    const coefficient = 10 ** n
    return Math.round(target * coefficient) / coefficient;
}
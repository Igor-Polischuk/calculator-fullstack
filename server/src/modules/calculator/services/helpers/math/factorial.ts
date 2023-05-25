export function factorial(n: number): number {
  if (n == 0 || n == 1) {
    return 1
  }

  if (n < 0 || !Number.isInteger(n)) {
    throw new Error('Incorrect number to calculate')
  }

  return n * factorial(n - 1)
}


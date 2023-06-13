import request from "supertest"

import { IAppResponse } from "@modules/common/interfaces/IAppResponse"

const baseUrl = 'http://localhost:3000'

describe('Test calculation endpoint with valid expressions', () => {
    describe('Test calculation endpoint with valid expressions', () => {
        test("Test base case", async () => {
            const response = await request(baseUrl)
                .post('/api/calculator/calculate')
                .send({ expression: '1 + 1' })

            const result: IAppResponse<{ result: string }> = JSON.parse(response.text)

            expect(response.statusCode).toBe(200);
            expect(result.data?.result).toBe(2);
        })

        test("Calculate expression with functions", async () => {
            const response = await request(baseUrl)
                .post('/api/calculator/calculate')
                .send({ expression: 'sqrt(9+16)^3' })

            const result: IAppResponse<{ result: string }> = JSON.parse(response.text)

            expect(response.statusCode).toBe(200);
            expect(result.data?.result).toBe(125);
        })
    })

    describe('Test calculation endpoint with invalid request or expression', () => {
        test("Must return status 400 when no body", async () => {
            const response = await request(baseUrl)
                .post('/api/calculator/calculate')

            const result: IAppResponse<{ result: string }> = JSON.parse(response.text)

            expect(response.statusCode).toBe(400);
            expect(result.data).toBe(null);
            expect(result.error?.type).toBe('missingParameterError');
        })

        test("Must return status 400 when has invalid expression", async () => {
            const response = await request(baseUrl)
                .post('/api/calculator/calculate')
                .send({ expression: 'sqr9+5^' })

            const result: IAppResponse<{ result: string }> = JSON.parse(response.text)

            expect(response.statusCode).toBe(400);
            expect(result.data).toBe(null);
            expect(result.error?.type).toBe('validationError');
        })
    })
})
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nconst cors_1 = __importDefault(__webpack_require__(/*! cors */ \"cors\"));\nconst body_parser_1 = __importDefault(__webpack_require__(/*! body-parser */ \"body-parser\"));\nconst express_winston_1 = __importDefault(__webpack_require__(/*! express-winston */ \"express-winston\"));\nconst errorHandlerMiddleware_1 = __webpack_require__(/*! @middlewares/errorHandlerMiddleware */ \"./src/middlewares/errorHandlerMiddleware.ts\");\nconst logger_1 = __webpack_require__(/*! @modules/common/logger */ \"./src/modules/common/logger/index.ts\");\nconst modules_1 = __webpack_require__(/*! ./modules */ \"./src/modules/index.ts\");\nconst app = (0, express_1.default)();\nconst PORT = \"3000\" || 0;\napp.use((0, cors_1.default)());\napp.use(body_parser_1.default.json());\napp.use(body_parser_1.default.urlencoded({ extended: false }));\napp.use(express_winston_1.default.logger({\n    winstonInstance: logger_1.logger,\n    statusLevels: true,\n}));\napp.use(modules_1.appRouter);\napp.use(errorHandlerMiddleware_1.errorHandler);\napp.listen(PORT, () => {\n    console.log(`Server working at port ${PORT}`);\n});\n\n\n//# sourceURL=webpack://webpack-server-config/./src/app.ts?");

/***/ }),

/***/ "./src/middlewares/errorHandlerMiddleware.ts":
/*!***************************************************!*\
  !*** ./src/middlewares/errorHandlerMiddleware.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.errorHandler = void 0;\nconst AppError_1 = __webpack_require__(/*! @utils/AppErrors/AppError */ \"./src/utils/AppErrors/AppError.ts\");\nconst ResponseFormatter_1 = __webpack_require__(/*! @utils/ResponseFormatter */ \"./src/utils/ResponseFormatter.ts\");\nconst logger_1 = __webpack_require__(/*! @modules/common/logger */ \"./src/modules/common/logger/index.ts\");\nconst errorHandler = (err, req, res, next) => {\n    const meta = {\n        url: req.originalUrl,\n        method: req.method,\n        statusCode: res.statusCode,\n        message: err.message,\n    };\n    logger_1.logger.error('Error occurred', { meta });\n    const error = AppError_1.AppError.getErrorFrom(err);\n    const responseFormat = new ResponseFormatter_1.ResponseFormatter({ error }).json();\n    res.status(error.status).send(responseFormat);\n};\nexports.errorHandler = errorHandler;\n\n\n//# sourceURL=webpack://webpack-server-config/./src/middlewares/errorHandlerMiddleware.ts?");

/***/ }),

/***/ "./src/modules/calculator/controllers/calculator-controller.ts":
/*!*********************************************************************!*\
  !*** ./src/modules/calculator/controllers/calculator-controller.ts ***!
  \*********************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.calculatorController = void 0;\nconst express_validator_1 = __webpack_require__(/*! express-validator */ \"express-validator\");\nconst calculation_history_1 = __webpack_require__(/*! @modules/history/services/calculation-history */ \"./src/modules/history/services/calculation-history.ts\");\nconst responseHandler_1 = __webpack_require__(/*! @utils/decorators/responseHandler */ \"./src/utils/decorators/responseHandler.ts\");\nconst logger_1 = __webpack_require__(/*! @modules/common/logger */ \"./src/modules/common/logger/index.ts\");\nconst CalculatorService_1 = __webpack_require__(/*! ../services/CalculatorService */ \"./src/modules/calculator/services/CalculatorService/index.ts\");\nclass CalculatorController {\n    getOperations() {\n        const operations = CalculatorService_1.calculatorService.getOperations();\n        return {\n            items: operations,\n            total: operations.length\n        };\n    }\n    async calculate(req) {\n        const { expression } = (0, express_validator_1.matchedData)(req);\n        logger_1.logger.info(`Calculate expression: ${expression}`);\n        const result = CalculatorService_1.calculatorService.calculateExpression(expression);\n        const expressionResult = { result, expression };\n        logger_1.logger.info(`Calculation result: ${expression} = ${result}`);\n        await calculation_history_1.calculatioNHistoryService.addHistoryItem(expressionResult);\n        return expressionResult;\n    }\n}\n__decorate([\n    responseHandler_1.responseHandler\n], CalculatorController.prototype, \"getOperations\", null);\n__decorate([\n    responseHandler_1.responseHandler\n], CalculatorController.prototype, \"calculate\", null);\nexports.calculatorController = new CalculatorController();\n\n\n//# sourceURL=webpack://webpack-server-config/./src/modules/calculator/controllers/calculator-controller.ts?");

/***/ }),

/***/ "./src/modules/calculator/index.ts":
/*!*****************************************!*\
  !*** ./src/modules/calculator/index.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.calculatorModule = void 0;\nconst calculatorRouter_1 = __webpack_require__(/*! ./routers/calculatorRouter */ \"./src/modules/calculator/routers/calculatorRouter.ts\");\nexports.calculatorModule = {\n    router: calculatorRouter_1.calculatorRouter,\n};\n\n\n//# sourceURL=webpack://webpack-server-config/./src/modules/calculator/index.ts?");

/***/ }),

/***/ "./src/modules/calculator/middlewares/expressionValidationMiddleware.ts":
/*!******************************************************************************!*\
  !*** ./src/modules/calculator/middlewares/expressionValidationMiddleware.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.expressionValidationMiddleware = void 0;\nconst express_validator_1 = __webpack_require__(/*! express-validator */ \"express-validator\");\nconst ErrorFactory_1 = __webpack_require__(/*! @utils/AppErrors/ErrorFactory */ \"./src/utils/AppErrors/ErrorFactory.ts\");\nconst requestValidator_1 = __webpack_require__(/*! @utils/requestValidator */ \"./src/utils/requestValidator.ts\");\nexports.expressionValidationMiddleware = (0, requestValidator_1.requestValidator)([\n    (0, express_validator_1.body)('expression')\n        .notEmpty()\n        .withMessage(ErrorFactory_1.ErrorFactory.MissingParameterError('expression', 'body'))\n        .isString()\n        .isLength({ max: 1500 })\n        .withMessage(ErrorFactory_1.ErrorFactory.IncorrectParameter('The expression must be a string of up to 1500 characters'))\n]);\n\n\n//# sourceURL=webpack://webpack-server-config/./src/modules/calculator/middlewares/expressionValidationMiddleware.ts?");

/***/ }),

/***/ "./src/modules/calculator/routers/calculatorRouter.ts":
/*!************************************************************!*\
  !*** ./src/modules/calculator/routers/calculatorRouter.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.calculatorRouter = void 0;\nconst express_1 = __webpack_require__(/*! express */ \"express\");\nconst expressionValidationMiddleware_1 = __webpack_require__(/*! ../middlewares/expressionValidationMiddleware */ \"./src/modules/calculator/middlewares/expressionValidationMiddleware.ts\");\nconst calculator_controller_1 = __webpack_require__(/*! ../controllers/calculator-controller */ \"./src/modules/calculator/controllers/calculator-controller.ts\");\nconst calculatorRouter = (0, express_1.Router)();\nexports.calculatorRouter = calculatorRouter;\ncalculatorRouter.post('/calculator/calculate', expressionValidationMiddleware_1.expressionValidationMiddleware, calculator_controller_1.calculatorController.calculate);\ncalculatorRouter.get('/calculator/operations', calculator_controller_1.calculatorController.getOperations);\n\n\n//# sourceURL=webpack://webpack-server-config/./src/modules/calculator/routers/calculatorRouter.ts?");

/***/ }),

/***/ "./src/modules/calculator/services/CalculatorService/index.ts":
/*!********************************************************************!*\
  !*** ./src/modules/calculator/services/CalculatorService/index.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.calculatorService = void 0;\nconst helpers_1 = __webpack_require__(/*! ../helpers */ \"./src/modules/calculator/services/helpers/index.ts\");\nconst calculator_config_1 = __webpack_require__(/*! ../calculator-config */ \"./src/modules/calculator/services/calculator-config/index.ts\");\nconst validateExpression_1 = __webpack_require__(/*! ../expressionValidation/validateExpression */ \"./src/modules/calculator/services/expressionValidation/validateExpression.ts\");\nclass CalculatorService {\n    calculateExpression(expression) {\n        const formattedExpression = (0, helpers_1.formatExpression)(expression);\n        (0, validateExpression_1.validateExpression)(formattedExpression);\n        const result = this.processBracketedExpression(formattedExpression);\n        const precision = process.env.PRECISION || 7;\n        return (0, helpers_1.formatDecimal)(Number(result), Number(precision));\n    }\n    processBracketedExpression(expression) {\n        const bracketsExpressions = (0, helpers_1.getMostNestedBrackets)(expression);\n        const replacedMostNestedBrackets = bracketsExpressions.reduce((expressionAcc, currentBracketExpression) => {\n            const unbracketedExpression = (0, helpers_1.unwrapBracketInExpression)(currentBracketExpression);\n            const currentBracketExpressionResult = this.calculateUnbracketedExpression(unbracketedExpression);\n            return expressionAcc.replace(currentBracketExpression, currentBracketExpressionResult);\n        }, expression);\n        return (0, helpers_1.hasBrackets)(replacedMostNestedBrackets)\n            ? this.processBracketedExpression(replacedMostNestedBrackets)\n            : this.calculateUnbracketedExpression(replacedMostNestedBrackets);\n    }\n    calculateUnbracketedExpression(expression) {\n        const expressionOperators = (0, helpers_1.getOperationsFromExpression)(expression);\n        const orderedOperations = expressionOperators.sort((a, b) => calculator_config_1.calculatorConfig[b].priority - calculator_config_1.calculatorConfig[a].priority);\n        const result = orderedOperations.reduce((expressionAcc, operation) => {\n            const currentOperationObj = calculator_config_1.calculatorConfig[operation];\n            const matchedExpressionWithOperation = expressionAcc.match(currentOperationObj.reg);\n            if (!matchedExpressionWithOperation) {\n                return expression;\n            }\n            const [expressionWithCurrentOperation] = matchedExpressionWithOperation;\n            const numbersOperand = (0, helpers_1.getNumbersFromExpression)(expressionWithCurrentOperation);\n            currentOperationObj.checkException(numbersOperand, expressionWithCurrentOperation);\n            const calculationResult = currentOperationObj.calculate(...numbersOperand).toString();\n            return expressionAcc.replace(expressionWithCurrentOperation, calculationResult);\n        }, expression);\n        return result;\n    }\n    getOperations() {\n        return calculator_config_1.allowedActions.reduce((operationsDataAcc, currentOperation) => {\n            const operationData = calculator_config_1.calculatorConfig[currentOperation];\n            const buttonText = {\n                operationSymbol: operationData.text || currentOperation,\n                operation: currentOperation\n            };\n            return [...operationsDataAcc, buttonText];\n        }, []);\n    }\n}\nexports.calculatorService = new CalculatorService();\n\n\n//# sourceURL=webpack://webpack-server-config/./src/modules/calculator/services/CalculatorService/index.ts?");

/***/ }),

/***/ "./src/modules/calculator/services/calculator-config/calculator-config.ts":
/*!********************************************************************************!*\
  !*** ./src/modules/calculator/services/calculator-config/calculator-config.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.calculatorConfig = void 0;\nconst priority_1 = __webpack_require__(/*! ./priority */ \"./src/modules/calculator/services/calculator-config/priority.ts\");\nconst Operation_1 = __webpack_require__(/*! ./operation/Operation */ \"./src/modules/calculator/services/calculator-config/operation/Operation.ts\");\nconst IOperations_1 = __webpack_require__(/*! ./operation/IOperations */ \"./src/modules/calculator/services/calculator-config/operation/IOperations.ts\");\nconst exceptions_1 = __webpack_require__(/*! ./exceptions */ \"./src/modules/calculator/services/calculator-config/exceptions.ts\");\nconst regex_1 = __webpack_require__(/*! ../helpers/regex */ \"./src/modules/calculator/services/helpers/regex.ts\");\nconst factorial_1 = __webpack_require__(/*! ../math/factorial */ \"./src/modules/calculator/services/math/factorial.ts\");\nexports.calculatorConfig = {\n    '+': new Operation_1.Operation({\n        priority: priority_1.Priority.Low,\n        reg: regex_1.regularWithParam.getNumberBetweenRegWithSymbol('+'),\n        calculate: (a, b) => a + b\n    }),\n    '-': new Operation_1.Operation({\n        priority: priority_1.Priority.Low,\n        reg: regex_1.regularWithParam.getNumberBetweenRegWithSymbol('-'),\n        calculate: (a, b) => a - b\n    }),\n    '*': new Operation_1.Operation({\n        priority: priority_1.Priority.Medium,\n        reg: regex_1.regularWithParam.getNumberBetweenRegWithSymbol('*'),\n        calculate: (a, b) => a * b,\n        text: '×'\n    }),\n    '/': new Operation_1.Operation({\n        priority: priority_1.Priority.Medium,\n        reg: regex_1.regularWithParam.getNumberBetweenRegWithSymbol('/'),\n        calculate: (a, b) => {\n            return a / b;\n        },\n        exceptionHandler: [exceptions_1.exceptions.zeroDivision],\n        text: '÷'\n    }),\n    '^': new Operation_1.Operation({\n        priority: priority_1.Priority.Hight,\n        reg: regex_1.regularWithParam.getNumberBetweenRegWithSymbol('^'),\n        calculate: (a, b) => Math.pow(a, b),\n        text: '<span>x<sup>y</sup></span>'\n    }),\n    '%': new Operation_1.Operation({\n        priority: priority_1.Priority.Low,\n        reg: regex_1.regularWithParam.getNumberBetweenRegWithSymbol('%'),\n        calculate: (percent, value) => value * (1 + percent / 100) - value\n    }),\n    '!': new Operation_1.Operation({\n        priority: priority_1.Priority.Hight,\n        reg: regex_1.regularWithParam.getNumbersLeftToSymbolReg('!'),\n        calculate: factorial_1.factorial,\n        exceptionHandler: [exceptions_1.exceptions.negativeNumber, exceptions_1.exceptions.notInteger]\n    }),\n    'sqrt': new Operation_1.Operation({\n        priority: priority_1.Priority.Hight,\n        calculate: Math.sqrt,\n        exceptionHandler: [exceptions_1.exceptions.negativeNumber],\n        reg: regex_1.regularWithParam.getFunctionRegWithParam('sqrt'),\n        type: IOperations_1.OperationType.MathFunction,\n        text: '√',\n    }),\n    'sin': new Operation_1.Operation({\n        priority: priority_1.Priority.Hight,\n        calculate: Math.sin,\n        reg: regex_1.regularWithParam.getFunctionRegWithParam('sin'),\n        type: IOperations_1.OperationType.MathFunction,\n    }),\n    'cos': new Operation_1.Operation({\n        priority: priority_1.Priority.Hight,\n        calculate: Math.cos,\n        reg: regex_1.regularWithParam.getFunctionRegWithParam('cos'),\n        type: IOperations_1.OperationType.MathFunction,\n    }),\n    'tg': new Operation_1.Operation({\n        priority: priority_1.Priority.Hight,\n        calculate: Math.sin,\n        reg: regex_1.regularWithParam.getFunctionRegWithParam('tg'),\n        type: IOperations_1.OperationType.MathFunction,\n    }),\n    'ctg': new Operation_1.Operation({\n        priority: priority_1.Priority.Hight,\n        calculate: (a) => 1 / Math.tan(a),\n        reg: regex_1.regularWithParam.getFunctionRegWithParam('ctg'),\n        type: IOperations_1.OperationType.MathFunction,\n    }),\n    'pi': new Operation_1.Operation({\n        priority: priority_1.Priority.Constant,\n        calculate: () => Math.PI,\n        reg: regex_1.regularWithParam.getConstantReg('pi'),\n        type: IOperations_1.OperationType.Constant\n    }),\n    'e': new Operation_1.Operation({\n        priority: priority_1.Priority.Constant,\n        calculate: () => Math.E,\n        reg: regex_1.regularWithParam.getConstantReg('e'),\n        type: IOperations_1.OperationType.Constant\n    }),\n};\n\n\n//# sourceURL=webpack://webpack-server-config/./src/modules/calculator/services/calculator-config/calculator-config.ts?");

/***/ }),

/***/ "./src/modules/calculator/services/calculator-config/exceptions.ts":
/*!*************************************************************************!*\
  !*** ./src/modules/calculator/services/calculator-config/exceptions.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.exceptions = void 0;\nexports.exceptions = {\n    zeroDivision: {\n        checkException: (a, b) => b === 0,\n        exceptionMessage: 'Zero division'\n    },\n    negativeNumber: {\n        checkException: (a) => a < 0,\n        exceptionMessage: 'Negative number'\n    },\n    notInteger: {\n        checkException: (a) => !Number.isInteger(a),\n        exceptionMessage: 'number isn\\'t integer'\n    },\n};\n\n\n//# sourceURL=webpack://webpack-server-config/./src/modules/calculator/services/calculator-config/exceptions.ts?");

/***/ }),

/***/ "./src/modules/calculator/services/calculator-config/index.ts":
/*!********************************************************************!*\
  !*** ./src/modules/calculator/services/calculator-config/index.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.functionReg = exports.constantReg = exports.searchAllowedOperationsRegStr = exports.allowedActions = exports.Priority = exports.calculatorConfig = void 0;\nconst priority_1 = __webpack_require__(/*! ./priority */ \"./src/modules/calculator/services/calculator-config/priority.ts\");\nObject.defineProperty(exports, \"Priority\", ({ enumerable: true, get: function () { return priority_1.Priority; } }));\nconst calculator_config_1 = __webpack_require__(/*! ./calculator-config */ \"./src/modules/calculator/services/calculator-config/calculator-config.ts\");\nObject.defineProperty(exports, \"calculatorConfig\", ({ enumerable: true, get: function () { return calculator_config_1.calculatorConfig; } }));\nconst IOperations_1 = __webpack_require__(/*! ./operation/IOperations */ \"./src/modules/calculator/services/calculator-config/operation/IOperations.ts\");\nexports.allowedActions = Object.keys(calculator_config_1.calculatorConfig);\nexports.searchAllowedOperationsRegStr = exports.allowedActions\n    .map(action => action.length === 1 ? `\\\\${action}` : action)\n    .join('|');\nexports.constantReg = exports.allowedActions\n    .flatMap(operation => calculator_config_1.calculatorConfig[operation].type === IOperations_1.OperationType.Constant ? operation : [])\n    .join('.');\nexports.functionReg = exports.allowedActions\n    .flatMap(operation => calculator_config_1.calculatorConfig[operation].type === IOperations_1.OperationType.MathFunction ? operation : [])\n    .join('|');\n\n\n//# sourceURL=webpack://webpack-server-config/./src/modules/calculator/services/calculator-config/index.ts?");

/***/ }),

/***/ "./src/modules/calculator/services/calculator-config/operation/IOperations.ts":
/*!************************************************************************************!*\
  !*** ./src/modules/calculator/services/calculator-config/operation/IOperations.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.OperationType = void 0;\nvar OperationType;\n(function (OperationType) {\n    OperationType[OperationType[\"Operation\"] = 0] = \"Operation\";\n    OperationType[OperationType[\"MathFunction\"] = 1] = \"MathFunction\";\n    OperationType[OperationType[\"Constant\"] = 2] = \"Constant\";\n})(OperationType = exports.OperationType || (exports.OperationType = {}));\n\n\n//# sourceURL=webpack://webpack-server-config/./src/modules/calculator/services/calculator-config/operation/IOperations.ts?");

/***/ }),

/***/ "./src/modules/calculator/services/calculator-config/operation/Operation.ts":
/*!**********************************************************************************!*\
  !*** ./src/modules/calculator/services/calculator-config/operation/Operation.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Operation = void 0;\nconst ErrorFactory_1 = __webpack_require__(/*! @utils/AppErrors/ErrorFactory */ \"./src/utils/AppErrors/ErrorFactory.ts\");\nconst IOperations_1 = __webpack_require__(/*! ./IOperations */ \"./src/modules/calculator/services/calculator-config/operation/IOperations.ts\");\nclass Operation {\n    constructor(params) {\n        this.exceptionHandler = [];\n        this.reg = params.reg;\n        this.calculate = params.calculate;\n        this.exceptionHandler = params.exceptionHandler || [];\n        this.type = params.type || IOperations_1.OperationType.Operation;\n        this.priority = params.priority;\n        this.text = params.text;\n    }\n    checkException(numbers, currentOperationExpression) {\n        if (this.exceptionHandler.length === 0) {\n            return;\n        }\n        this.exceptionHandler.forEach(exception => {\n            const isException = exception.checkException(...numbers);\n            if (isException) {\n                throw ErrorFactory_1.ErrorFactory.CalculationError(exception.exceptionMessage, currentOperationExpression);\n            }\n        });\n    }\n}\nexports.Operation = Operation;\n\n\n//# sourceURL=webpack://webpack-server-config/./src/modules/calculator/services/calculator-config/operation/Operation.ts?");

/***/ }),

/***/ "./src/modules/calculator/services/calculator-config/priority.ts":
/*!***********************************************************************!*\
  !*** ./src/modules/calculator/services/calculator-config/priority.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Priority = void 0;\nexports.Priority = {\n    Constant: 3,\n    Hight: 2,\n    Medium: 1,\n    Low: 0,\n};\n\n\n//# sourceURL=webpack://webpack-server-config/./src/modules/calculator/services/calculator-config/priority.ts?");

/***/ }),

/***/ "./src/modules/calculator/services/expressionValidation/validateExpression.ts":
/*!************************************************************************************!*\
  !*** ./src/modules/calculator/services/expressionValidation/validateExpression.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.validateExpression = void 0;\nconst ExpressionValidationError_1 = __webpack_require__(/*! @utils/AppErrors/ExpressionValidationError */ \"./src/utils/AppErrors/ExpressionValidationError.ts\");\nconst validators_1 = __webpack_require__(/*! ./validators */ \"./src/modules/calculator/services/expressionValidation/validators/index.ts\");\nconst logger_1 = __webpack_require__(/*! @modules/common/logger */ \"./src/modules/common/logger/index.ts\");\nfunction validateExpression(expression) {\n    logger_1.logger.info(`Validate expression: ${expression}`);\n    const validateResult = validate(expression, [\n        validators_1.pointValidator,\n        validators_1.bracketsOrderValidator,\n        validators_1.bracketsSiblingsValidator,\n        validators_1.zeroDivisionValidator,\n        validators_1.operationsInRow,\n        validators_1.unknownSymbolValidator,\n        validators_1.expressionStartValidator,\n        validators_1.expressionEndValidator,\n        validators_1.functionValidator\n    ]);\n    if (validateResult.length > 0) {\n        logger_1.logger.info(`Expression invalid: ${expression}`);\n        throw new ExpressionValidationError_1.ExpressionValidationError(validateResult);\n    }\n    return true;\n}\nexports.validateExpression = validateExpression;\nfunction validate(expression, validators) {\n    const errors = validators.flatMap(validatorName => {\n        const validateResult = validatorName(expression);\n        return validateResult ? validateResult : [];\n    });\n    return errors;\n}\n\n\n//# sourceURL=webpack://webpack-server-config/./src/modules/calculator/services/expressionValidation/validateExpression.ts?");

/***/ }),

/***/ "./src/modules/calculator/services/expressionValidation/validation-error.ts":
/*!**********************************************************************************!*\
  !*** ./src/modules/calculator/services/expressionValidation/validation-error.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.ValidationError = void 0;\nvar ValidationError;\n(function (ValidationError) {\n    ValidationError[\"ClosedBracketError\"] = \"unexpected closing bracket\";\n    ValidationError[\"OpenBracketError\"] = \"unexpected open bracket\";\n    ValidationError[\"BracketAdjacentCharactersError\"] = \"incorrect characters near brackets\";\n    ValidationError[\"ZeroDivisionError\"] = \"division by Zero\";\n    ValidationError[\"NumberPointError\"] = \"number with several points\";\n    ValidationError[\"OperationsInRowError\"] = \"several operations are entered in a row\";\n    ValidationError[\"PointError\"] = \"point in incorrect place\";\n    ValidationError[\"UnknownSymbolError\"] = \"unexpected character\";\n    ValidationError[\"IncorrectFunctionNameError\"] = \"incorrect function name\";\n    ValidationError[\"LineStartError\"] = \"incorrect start of expression\";\n    ValidationError[\"LineEndError\"] = \"incorrect end of expression\";\n    ValidationError[\"IncorrectFunctionArgumentError\"] = \"incorrect function argument\";\n})(ValidationError = exports.ValidationError || (exports.ValidationError = {}));\n\n\n//# sourceURL=webpack://webpack-server-config/./src/modules/calculator/services/expressionValidation/validation-error.ts?");

/***/ }),

/***/ "./src/modules/calculator/services/expressionValidation/validators/bracketsOrderValidator.ts":
/*!***************************************************************************************************!*\
  !*** ./src/modules/calculator/services/expressionValidation/validators/bracketsOrderValidator.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.bracketsOrderValidator = void 0;\nconst validation_error_1 = __webpack_require__(/*! ../validation-error */ \"./src/modules/calculator/services/expressionValidation/validation-error.ts\");\nfunction bracketsOrderValidator(expression) {\n    let bracketCount = 0;\n    for (let i = 0; i < expression.length; i++) {\n        const char = expression[i];\n        if (char === \"(\") {\n            bracketCount++;\n        }\n        else if (char === \")\") {\n            if (bracketCount === 0) {\n                return {\n                    message: validation_error_1.ValidationError.ClosedBracketError,\n                    errorPlace: [{ from: i, to: i }]\n                };\n            }\n            bracketCount--;\n        }\n    }\n    if (bracketCount > 0) {\n        const bracketIndex = expression.indexOf('(');\n        return {\n            message: validation_error_1.ValidationError.OpenBracketError,\n            errorPlace: [{ from: bracketIndex, to: bracketIndex }]\n        };\n    }\n}\nexports.bracketsOrderValidator = bracketsOrderValidator;\n\n\n//# sourceURL=webpack://webpack-server-config/./src/modules/calculator/services/expressionValidation/validators/bracketsOrderValidator.ts?");

/***/ }),

/***/ "./src/modules/calculator/services/expressionValidation/validators/bracketsSiblingsValidator.ts":
/*!******************************************************************************************************!*\
  !*** ./src/modules/calculator/services/expressionValidation/validators/bracketsSiblingsValidator.ts ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.bracketsSiblingsValidator = void 0;\nconst validation_error_1 = __webpack_require__(/*! ../validation-error */ \"./src/modules/calculator/services/expressionValidation/validation-error.ts\");\nconst regex_1 = __webpack_require__(/*! ../../helpers/regex */ \"./src/modules/calculator/services/helpers/regex.ts\");\nconst getSubstringsIndexes_1 = __webpack_require__(/*! ../../helpers/getSubstringsIndexes */ \"./src/modules/calculator/services/helpers/getSubstringsIndexes/index.ts\");\nfunction bracketsSiblingsValidator(expression) {\n    const wrongOpenBracketSiblings = expression.match(regex_1.regexPatterns.OPEN_BRACKETS_ADJACENT_SYMBOLS);\n    const wrongClosedBracketSiblings = expression.match(regex_1.regexPatterns.CLOSED_BRACKETS_ADJACENT_SYMBOLS);\n    const errorIndexes = [];\n    if (wrongOpenBracketSiblings) {\n        errorIndexes.push(...(0, getSubstringsIndexes_1.getSubstringsIndexes)(wrongOpenBracketSiblings, expression));\n    }\n    if (wrongClosedBracketSiblings) {\n        errorIndexes.push(...(0, getSubstringsIndexes_1.getSubstringsIndexes)(wrongClosedBracketSiblings, expression));\n    }\n    if (errorIndexes.length > 0) {\n        return {\n            message: validation_error_1.ValidationError.BracketAdjacentCharactersError,\n            errorPlace: errorIndexes\n        };\n    }\n}\nexports.bracketsSiblingsValidator = bracketsSiblingsValidator;\n\n\n//# sourceURL=webpack://webpack-server-config/./src/modules/calculator/services/expressionValidation/validators/bracketsSiblingsValidator.ts?");

/***/ }),

/***/ "./src/modules/calculator/services/expressionValidation/validators/expressionEndValidator.ts":
/*!***************************************************************************************************!*\
  !*** ./src/modules/calculator/services/expressionValidation/validators/expressionEndValidator.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.expressionEndValidator = void 0;\nconst regex_1 = __webpack_require__(/*! ../../helpers/regex */ \"./src/modules/calculator/services/helpers/regex.ts\");\nconst validation_error_1 = __webpack_require__(/*! ../validation-error */ \"./src/modules/calculator/services/expressionValidation/validation-error.ts\");\nfunction expressionEndValidator(expression) {\n    const isCorrectEnd = regex_1.regexPatterns.EXPRESSION_END.test(expression);\n    if (!isCorrectEnd) {\n        return {\n            message: validation_error_1.ValidationError.LineEndError,\n            errorPlace: [{ from: expression.length - 1, to: expression.length - 1 }]\n        };\n    }\n}\nexports.expressionEndValidator = expressionEndValidator;\n\n\n//# sourceURL=webpack://webpack-server-config/./src/modules/calculator/services/expressionValidation/validators/expressionEndValidator.ts?");

/***/ }),

/***/ "./src/modules/calculator/services/expressionValidation/validators/expressionStartValidator.ts":
/*!*****************************************************************************************************!*\
  !*** ./src/modules/calculator/services/expressionValidation/validators/expressionStartValidator.ts ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.expressionStartValidator = void 0;\nconst regex_1 = __webpack_require__(/*! ../../helpers/regex */ \"./src/modules/calculator/services/helpers/regex.ts\");\nconst validation_error_1 = __webpack_require__(/*! ../validation-error */ \"./src/modules/calculator/services/expressionValidation/validation-error.ts\");\nfunction expressionStartValidator(expression) {\n    const isCorrectStart = regex_1.regexPatterns.EXPRESSION_START.test(expression);\n    if (!isCorrectStart) {\n        return {\n            message: validation_error_1.ValidationError.LineStartError,\n            errorPlace: [{ from: 0, to: 0 }]\n        };\n    }\n}\nexports.expressionStartValidator = expressionStartValidator;\n\n\n//# sourceURL=webpack://webpack-server-config/./src/modules/calculator/services/expressionValidation/validators/expressionStartValidator.ts?");

/***/ }),

/***/ "./src/modules/calculator/services/expressionValidation/validators/functionValidator.ts":
/*!**********************************************************************************************!*\
  !*** ./src/modules/calculator/services/expressionValidation/validators/functionValidator.ts ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.functionValidator = void 0;\nconst calculator_config_1 = __webpack_require__(/*! ../../calculator-config */ \"./src/modules/calculator/services/calculator-config/index.ts\");\nconst getSubstringsIndexes_1 = __webpack_require__(/*! ../../helpers/getSubstringsIndexes */ \"./src/modules/calculator/services/helpers/getSubstringsIndexes/index.ts\");\nconst validation_error_1 = __webpack_require__(/*! ../validation-error */ \"./src/modules/calculator/services/expressionValidation/validation-error.ts\");\nfunction functionValidator(expression) {\n    const incorrectFunctionReg = new RegExp(`(${calculator_config_1.functionReg})(?![\\\\d(])`, 'g');\n    const incorrectFunctions = expression.match(incorrectFunctionReg);\n    if (incorrectFunctions) {\n        return {\n            message: validation_error_1.ValidationError.IncorrectFunctionArgumentError,\n            errorPlace: (0, getSubstringsIndexes_1.getSubstringsIndexes)(incorrectFunctions, expression)\n        };\n    }\n}\nexports.functionValidator = functionValidator;\n\n\n//# sourceURL=webpack://webpack-server-config/./src/modules/calculator/services/expressionValidation/validators/functionValidator.ts?");

/***/ }),

/***/ "./src/modules/calculator/services/expressionValidation/validators/incorrectFunctionNameValidator.ts":
/*!***********************************************************************************************************!*\
  !*** ./src/modules/calculator/services/expressionValidation/validators/incorrectFunctionNameValidator.ts ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.incorrectFunctionNameValidator = void 0;\nconst calculator_config_1 = __webpack_require__(/*! ../../calculator-config */ \"./src/modules/calculator/services/calculator-config/index.ts\");\nconst getSubstringsIndexes_1 = __webpack_require__(/*! ../../helpers/getSubstringsIndexes */ \"./src/modules/calculator/services/helpers/getSubstringsIndexes/index.ts\");\nconst regex_1 = __webpack_require__(/*! ../../helpers/regex */ \"./src/modules/calculator/services/helpers/regex.ts\");\nconst validation_error_1 = __webpack_require__(/*! ../validation-error */ \"./src/modules/calculator/services/expressionValidation/validation-error.ts\");\nfunction incorrectFunctionNameValidator(expression) {\n    const allWords = expression.match(regex_1.regexPatterns.ALL_WORDS);\n    if (allWords) {\n        for (let i = 0; i < allWords.length; i++) {\n            const word = allWords[i];\n            if (!calculator_config_1.calculatorConfig[word]) {\n                return {\n                    message: validation_error_1.ValidationError.IncorrectFunctionNameError,\n                    errorPlace: (0, getSubstringsIndexes_1.getSubstringsIndexes)([word], expression)\n                };\n            }\n        }\n    }\n}\nexports.incorrectFunctionNameValidator = incorrectFunctionNameValidator;\n\n\n//# sourceURL=webpack://webpack-server-config/./src/modules/calculator/services/expressionValidation/validators/incorrectFunctionNameValidator.ts?");

/***/ }),

/***/ "./src/modules/calculator/services/expressionValidation/validators/index.ts":
/*!**********************************************************************************!*\
  !*** ./src/modules/calculator/services/expressionValidation/validators/index.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.functionValidator = exports.expressionEndValidator = exports.expressionStartValidator = exports.incorrectFunctionNameValidator = exports.unknownSymbolValidator = exports.operationsInRow = exports.pointValidator = exports.zeroDivisionValidator = exports.bracketsSiblingsValidator = exports.bracketsOrderValidator = void 0;\nconst bracketsOrderValidator_1 = __webpack_require__(/*! ./bracketsOrderValidator */ \"./src/modules/calculator/services/expressionValidation/validators/bracketsOrderValidator.ts\");\nObject.defineProperty(exports, \"bracketsOrderValidator\", ({ enumerable: true, get: function () { return bracketsOrderValidator_1.bracketsOrderValidator; } }));\nconst bracketsSiblingsValidator_1 = __webpack_require__(/*! ./bracketsSiblingsValidator */ \"./src/modules/calculator/services/expressionValidation/validators/bracketsSiblingsValidator.ts\");\nObject.defineProperty(exports, \"bracketsSiblingsValidator\", ({ enumerable: true, get: function () { return bracketsSiblingsValidator_1.bracketsSiblingsValidator; } }));\nconst expressionEndValidator_1 = __webpack_require__(/*! ./expressionEndValidator */ \"./src/modules/calculator/services/expressionValidation/validators/expressionEndValidator.ts\");\nObject.defineProperty(exports, \"expressionEndValidator\", ({ enumerable: true, get: function () { return expressionEndValidator_1.expressionEndValidator; } }));\nconst expressionStartValidator_1 = __webpack_require__(/*! ./expressionStartValidator */ \"./src/modules/calculator/services/expressionValidation/validators/expressionStartValidator.ts\");\nObject.defineProperty(exports, \"expressionStartValidator\", ({ enumerable: true, get: function () { return expressionStartValidator_1.expressionStartValidator; } }));\nconst functionValidator_1 = __webpack_require__(/*! ./functionValidator */ \"./src/modules/calculator/services/expressionValidation/validators/functionValidator.ts\");\nObject.defineProperty(exports, \"functionValidator\", ({ enumerable: true, get: function () { return functionValidator_1.functionValidator; } }));\nconst incorrectFunctionNameValidator_1 = __webpack_require__(/*! ./incorrectFunctionNameValidator */ \"./src/modules/calculator/services/expressionValidation/validators/incorrectFunctionNameValidator.ts\");\nObject.defineProperty(exports, \"incorrectFunctionNameValidator\", ({ enumerable: true, get: function () { return incorrectFunctionNameValidator_1.incorrectFunctionNameValidator; } }));\nconst operationsInRow_1 = __webpack_require__(/*! ./operationsInRow */ \"./src/modules/calculator/services/expressionValidation/validators/operationsInRow.ts\");\nObject.defineProperty(exports, \"operationsInRow\", ({ enumerable: true, get: function () { return operationsInRow_1.operationsInRow; } }));\nconst pointValidator_1 = __webpack_require__(/*! ./pointValidator */ \"./src/modules/calculator/services/expressionValidation/validators/pointValidator.ts\");\nObject.defineProperty(exports, \"pointValidator\", ({ enumerable: true, get: function () { return pointValidator_1.pointValidator; } }));\nconst unknownSymbolValidator_1 = __webpack_require__(/*! ./unknownSymbolValidator */ \"./src/modules/calculator/services/expressionValidation/validators/unknownSymbolValidator.ts\");\nObject.defineProperty(exports, \"unknownSymbolValidator\", ({ enumerable: true, get: function () { return unknownSymbolValidator_1.unknownSymbolValidator; } }));\nconst zeroDivisionValidator_1 = __webpack_require__(/*! ./zeroDivisionValidator */ \"./src/modules/calculator/services/expressionValidation/validators/zeroDivisionValidator.ts\");\nObject.defineProperty(exports, \"zeroDivisionValidator\", ({ enumerable: true, get: function () { return zeroDivisionValidator_1.zeroDivisionValidator; } }));\n\n\n//# sourceURL=webpack://webpack-server-config/./src/modules/calculator/services/expressionValidation/validators/index.ts?");

/***/ }),

/***/ "./src/modules/calculator/services/expressionValidation/validators/operationsInRow.ts":
/*!********************************************************************************************!*\
  !*** ./src/modules/calculator/services/expressionValidation/validators/operationsInRow.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.operationsInRow = void 0;\nconst regex_1 = __webpack_require__(/*! ../../helpers/regex */ \"./src/modules/calculator/services/helpers/regex.ts\");\nconst validation_error_1 = __webpack_require__(/*! ../validation-error */ \"./src/modules/calculator/services/expressionValidation/validation-error.ts\");\nconst getSubstringsIndexes_1 = __webpack_require__(/*! ../../helpers/getSubstringsIndexes */ \"./src/modules/calculator/services/helpers/getSubstringsIndexes/index.ts\");\nfunction operationsInRow(expression) {\n    const actionsInRow = expression.match(regex_1.regexPatterns.OPERATIONS_IN_ROW);\n    if (actionsInRow) {\n        return {\n            message: validation_error_1.ValidationError.OperationsInRowError,\n            errorPlace: (0, getSubstringsIndexes_1.getSubstringsIndexes)(actionsInRow, expression)\n        };\n    }\n}\nexports.operationsInRow = operationsInRow;\n\n\n//# sourceURL=webpack://webpack-server-config/./src/modules/calculator/services/expressionValidation/validators/operationsInRow.ts?");

/***/ }),

/***/ "./src/modules/calculator/services/expressionValidation/validators/pointValidator.ts":
/*!*******************************************************************************************!*\
  !*** ./src/modules/calculator/services/expressionValidation/validators/pointValidator.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.pointValidator = void 0;\nconst validation_error_1 = __webpack_require__(/*! ../validation-error */ \"./src/modules/calculator/services/expressionValidation/validation-error.ts\");\nconst regex_1 = __webpack_require__(/*! ../../helpers/regex */ \"./src/modules/calculator/services/helpers/regex.ts\");\nconst getSubstringsIndexes_1 = __webpack_require__(/*! ../../helpers/getSubstringsIndexes */ \"./src/modules/calculator/services/helpers/getSubstringsIndexes/index.ts\");\nfunction pointValidator(expression) {\n    for (let i = 0; i < expression.length; i++) {\n        const char = expression[i];\n        if (char === '.' && (isNaN(+expression[i - 1]) || isNaN(+expression[i + 1]))) {\n            return {\n                message: validation_error_1.ValidationError.PointError,\n                errorPlace: [{ from: i, to: i }]\n            };\n        }\n    }\n    const numberWithSeveralPoints = expression.match(regex_1.regexPatterns.DOUBLE_POINTS_IN_NUMBER);\n    if (numberWithSeveralPoints) {\n        return {\n            message: validation_error_1.ValidationError.NumberPointError,\n            errorPlace: (0, getSubstringsIndexes_1.getSubstringsIndexes)(numberWithSeveralPoints, expression)\n        };\n    }\n}\nexports.pointValidator = pointValidator;\n\n\n//# sourceURL=webpack://webpack-server-config/./src/modules/calculator/services/expressionValidation/validators/pointValidator.ts?");

/***/ }),

/***/ "./src/modules/calculator/services/expressionValidation/validators/unknownSymbolValidator.ts":
/*!***************************************************************************************************!*\
  !*** ./src/modules/calculator/services/expressionValidation/validators/unknownSymbolValidator.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.unknownSymbolValidator = void 0;\nconst validation_error_1 = __webpack_require__(/*! ../validation-error */ \"./src/modules/calculator/services/expressionValidation/validation-error.ts\");\nconst getSubstringsIndexes_1 = __webpack_require__(/*! ../../helpers/getSubstringsIndexes */ \"./src/modules/calculator/services/helpers/getSubstringsIndexes/index.ts\");\nconst incorrectFunctionNameValidator_1 = __webpack_require__(/*! ./incorrectFunctionNameValidator */ \"./src/modules/calculator/services/expressionValidation/validators/incorrectFunctionNameValidator.ts\");\nconst calculator_config_1 = __webpack_require__(/*! ../../calculator-config */ \"./src/modules/calculator/services/calculator-config/index.ts\");\nfunction unknownSymbolValidator(expression) {\n    const unknownSymbolReg = new RegExp(`[^0-9${calculator_config_1.searchAllowedOperationsRegStr}().]`, \"g\");\n    const unknownSymbols = expression.match(unknownSymbolReg);\n    if (unknownSymbols) {\n        return {\n            message: validation_error_1.ValidationError.UnknownSymbolError,\n            errorPlace: (0, getSubstringsIndexes_1.getSubstringsIndexes)(unknownSymbols, expression)\n        };\n    }\n    return (0, incorrectFunctionNameValidator_1.incorrectFunctionNameValidator)(expression);\n}\nexports.unknownSymbolValidator = unknownSymbolValidator;\n\n\n//# sourceURL=webpack://webpack-server-config/./src/modules/calculator/services/expressionValidation/validators/unknownSymbolValidator.ts?");

/***/ }),

/***/ "./src/modules/calculator/services/expressionValidation/validators/zeroDivisionValidator.ts":
/*!**************************************************************************************************!*\
  !*** ./src/modules/calculator/services/expressionValidation/validators/zeroDivisionValidator.ts ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.zeroDivisionValidator = void 0;\nconst regex_1 = __webpack_require__(/*! ../../helpers/regex */ \"./src/modules/calculator/services/helpers/regex.ts\");\nconst validation_error_1 = __webpack_require__(/*! ../validation-error */ \"./src/modules/calculator/services/expressionValidation/validation-error.ts\");\nfunction zeroDivisionValidator(expression) {\n    const zeroDivisionMatch = expression.match(regex_1.regexPatterns.ZERO_DIVISION);\n    if (zeroDivisionMatch) {\n        return {\n            message: validation_error_1.ValidationError.ZeroDivisionError,\n            errorPlace: [{ from: zeroDivisionMatch.index, to: zeroDivisionMatch.index }]\n        };\n    }\n}\nexports.zeroDivisionValidator = zeroDivisionValidator;\n\n\n//# sourceURL=webpack://webpack-server-config/./src/modules/calculator/services/expressionValidation/validators/zeroDivisionValidator.ts?");

/***/ }),

/***/ "./src/modules/calculator/services/helpers/brackets/getMostNestedBrackets.ts":
/*!***********************************************************************************!*\
  !*** ./src/modules/calculator/services/helpers/brackets/getMostNestedBrackets.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.getMostNestedBrackets = void 0;\nconst regex_1 = __webpack_require__(/*! ../regex */ \"./src/modules/calculator/services/helpers/regex.ts\");\nfunction getMostNestedBrackets(expression) {\n    return expression.match(regex_1.regexPatterns.MOST_NESTED_BRACKET) || [];\n}\nexports.getMostNestedBrackets = getMostNestedBrackets;\n\n\n//# sourceURL=webpack://webpack-server-config/./src/modules/calculator/services/helpers/brackets/getMostNestedBrackets.ts?");

/***/ }),

/***/ "./src/modules/calculator/services/helpers/brackets/hasBrackets.ts":
/*!*************************************************************************!*\
  !*** ./src/modules/calculator/services/helpers/brackets/hasBrackets.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.hasBrackets = void 0;\nfunction hasBrackets(expression) {\n    return expression.includes('(') || expression.includes(')');\n}\nexports.hasBrackets = hasBrackets;\n\n\n//# sourceURL=webpack://webpack-server-config/./src/modules/calculator/services/helpers/brackets/hasBrackets.ts?");

/***/ }),

/***/ "./src/modules/calculator/services/helpers/brackets/unwrapExpressionTerms.ts":
/*!***********************************************************************************!*\
  !*** ./src/modules/calculator/services/helpers/brackets/unwrapExpressionTerms.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.unwrapBracketInExpression = void 0;\nfunction unwrapBracketInExpression(expression) {\n    return expression.replace(/\\(|\\)/g, '');\n}\nexports.unwrapBracketInExpression = unwrapBracketInExpression;\n\n\n//# sourceURL=webpack://webpack-server-config/./src/modules/calculator/services/helpers/brackets/unwrapExpressionTerms.ts?");

/***/ }),

/***/ "./src/modules/calculator/services/helpers/findSubstringIndexes/index.ts":
/*!*******************************************************************************!*\
  !*** ./src/modules/calculator/services/helpers/findSubstringIndexes/index.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.findSubstringIndexes = void 0;\nfunction findSubstringIndexes(str, substr, startIndex = 0) {\n    const index = str.indexOf(substr, startIndex);\n    if (index === -1) {\n        return null;\n    }\n    return { from: index, to: index + substr.length - 1 };\n}\nexports.findSubstringIndexes = findSubstringIndexes;\n\n\n//# sourceURL=webpack://webpack-server-config/./src/modules/calculator/services/helpers/findSubstringIndexes/index.ts?");

/***/ }),

/***/ "./src/modules/calculator/services/helpers/formatDecimal/index.ts":
/*!************************************************************************!*\
  !*** ./src/modules/calculator/services/helpers/formatDecimal/index.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.formatDecimal = void 0;\n/**\n * function receives a float number and returns a number with no more than n decimal places\n */\nfunction formatDecimal(target, n = 2) {\n    const coefficient = 10 ** n;\n    return Math.round(target * coefficient) / coefficient;\n}\nexports.formatDecimal = formatDecimal;\n\n\n//# sourceURL=webpack://webpack-server-config/./src/modules/calculator/services/helpers/formatDecimal/index.ts?");

/***/ }),

/***/ "./src/modules/calculator/services/helpers/getNumberFromExpression/index.ts":
/*!**********************************************************************************!*\
  !*** ./src/modules/calculator/services/helpers/getNumberFromExpression/index.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.getNumbersFromExpression = void 0;\nconst regex_1 = __webpack_require__(/*! ../regex */ \"./src/modules/calculator/services/helpers/regex.ts\");\nfunction getNumbersFromExpression(str) {\n    const numbersInString = str.match(regex_1.regexPatterns.NUMBERS);\n    return numbersInString?.map(number => +number) || [];\n}\nexports.getNumbersFromExpression = getNumbersFromExpression;\n\n\n//# sourceURL=webpack://webpack-server-config/./src/modules/calculator/services/helpers/getNumberFromExpression/index.ts?");

/***/ }),

/***/ "./src/modules/calculator/services/helpers/getOperationsFromExpression/index.ts":
/*!**************************************************************************************!*\
  !*** ./src/modules/calculator/services/helpers/getOperationsFromExpression/index.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.getOperationsFromExpression = void 0;\nconst calculator_config_1 = __webpack_require__(/*! ../../calculator-config */ \"./src/modules/calculator/services/calculator-config/index.ts\");\nfunction getOperationsFromExpression(expression) {\n    const minusInNumberReg = new RegExp(`(?<![0-9${calculator_config_1.constantReg}])-`, 'g');\n    const operations = expression\n        .replace(minusInNumberReg, '')\n        .match(RegExp(calculator_config_1.searchAllowedOperationsRegStr, 'g'));\n    return operations || [];\n}\nexports.getOperationsFromExpression = getOperationsFromExpression;\n\n\n//# sourceURL=webpack://webpack-server-config/./src/modules/calculator/services/helpers/getOperationsFromExpression/index.ts?");

/***/ }),

/***/ "./src/modules/calculator/services/helpers/getSubstringsIndexes/index.ts":
/*!*******************************************************************************!*\
  !*** ./src/modules/calculator/services/helpers/getSubstringsIndexes/index.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.getSubstringsIndexes = void 0;\nconst findSubstringIndexes_1 = __webpack_require__(/*! ../findSubstringIndexes */ \"./src/modules/calculator/services/helpers/findSubstringIndexes/index.ts\");\nfunction getSubstringsIndexes(substrings, inputString) {\n    return substrings.reduce((indexesAcc, invalidPart) => {\n        const startSearchFrom = indexesAcc[indexesAcc.length - 1]?.to || 0;\n        const indexesOfCurrentParts = (0, findSubstringIndexes_1.findSubstringIndexes)(inputString, invalidPart, startSearchFrom);\n        return indexesOfCurrentParts ? [...indexesAcc, indexesOfCurrentParts] : indexesAcc;\n        // return [...indexesAcc, indexesOfCurrentParts]\n    }, []);\n}\nexports.getSubstringsIndexes = getSubstringsIndexes;\n\n\n//# sourceURL=webpack://webpack-server-config/./src/modules/calculator/services/helpers/getSubstringsIndexes/index.ts?");

/***/ }),

/***/ "./src/modules/calculator/services/helpers/index.ts":
/*!**********************************************************!*\
  !*** ./src/modules/calculator/services/helpers/index.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.formatExpression = exports.formatDecimal = exports.getOperationsFromExpression = exports.getNumbersFromExpression = exports.unwrapBracketInExpression = exports.hasBrackets = exports.getMostNestedBrackets = void 0;\nconst getMostNestedBrackets_1 = __webpack_require__(/*! ../helpers/brackets/getMostNestedBrackets */ \"./src/modules/calculator/services/helpers/brackets/getMostNestedBrackets.ts\");\nObject.defineProperty(exports, \"getMostNestedBrackets\", ({ enumerable: true, get: function () { return getMostNestedBrackets_1.getMostNestedBrackets; } }));\nconst hasBrackets_1 = __webpack_require__(/*! ../helpers/brackets/hasBrackets */ \"./src/modules/calculator/services/helpers/brackets/hasBrackets.ts\");\nObject.defineProperty(exports, \"hasBrackets\", ({ enumerable: true, get: function () { return hasBrackets_1.hasBrackets; } }));\nconst unwrapExpressionTerms_1 = __webpack_require__(/*! ../helpers/brackets/unwrapExpressionTerms */ \"./src/modules/calculator/services/helpers/brackets/unwrapExpressionTerms.ts\");\nObject.defineProperty(exports, \"unwrapBracketInExpression\", ({ enumerable: true, get: function () { return unwrapExpressionTerms_1.unwrapBracketInExpression; } }));\nconst getNumberFromExpression_1 = __webpack_require__(/*! ../helpers/getNumberFromExpression */ \"./src/modules/calculator/services/helpers/getNumberFromExpression/index.ts\");\nObject.defineProperty(exports, \"getNumbersFromExpression\", ({ enumerable: true, get: function () { return getNumberFromExpression_1.getNumbersFromExpression; } }));\nconst getOperationsFromExpression_1 = __webpack_require__(/*! ../helpers/getOperationsFromExpression */ \"./src/modules/calculator/services/helpers/getOperationsFromExpression/index.ts\");\nObject.defineProperty(exports, \"getOperationsFromExpression\", ({ enumerable: true, get: function () { return getOperationsFromExpression_1.getOperationsFromExpression; } }));\nconst formatDecimal_1 = __webpack_require__(/*! ../helpers/formatDecimal */ \"./src/modules/calculator/services/helpers/formatDecimal/index.ts\");\nObject.defineProperty(exports, \"formatDecimal\", ({ enumerable: true, get: function () { return formatDecimal_1.formatDecimal; } }));\nconst formatExpression_1 = __webpack_require__(/*! ../helpers/text-formatting/formatExpression */ \"./src/modules/calculator/services/helpers/text-formatting/formatExpression.ts\");\nObject.defineProperty(exports, \"formatExpression\", ({ enumerable: true, get: function () { return formatExpression_1.formatExpression; } }));\n\n\n//# sourceURL=webpack://webpack-server-config/./src/modules/calculator/services/helpers/index.ts?");

/***/ }),

/***/ "./src/modules/calculator/services/helpers/regex.ts":
/*!**********************************************************!*\
  !*** ./src/modules/calculator/services/helpers/regex.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.regularWithParam = exports.regexPatterns = void 0;\nconst NUMBER_REG_STRING = '(?<!\\\\d)-?\\\\d+(\\\\.\\\\d+)?(e[+-]?\\\\d+)?';\nexports.regexPatterns = {\n    NUMBERS: new RegExp(NUMBER_REG_STRING, 'g'),\n    MINUS_IN_NUMBER: /(^|-|\\()-/g,\n    E_CONST: /(?<![0-9eE.+-])e(?![0-9eE.+-])/,\n    ZERO_DIVISION: /\\/0+(?!\\.\\d)/,\n    OPEN_BRACKETS_ADJACENT_SYMBOLS: /[\\d|!]\\(|\\([\\+\\*\\/\\^\\!]/g,\n    CLOSED_BRACKETS_ADJACENT_SYMBOLS: /[^\\d\\)\\w\\!]\\)|\\)[\\d\\w]/g,\n    DOUBLE_POINTS_IN_NUMBER: /\\d+(\\.\\d+){2,}/g,\n    MOST_NESTED_BRACKET: /\\(([^()]+)\\)/g,\n    OPERATIONS_IN_ROW: /([-+*/^!]{2,})/g,\n    ALL_WORDS: /[a-zA-Z]+/g,\n    EXPRESSION_START: /^(?:(?:-?[a-z])|(?:-?\\d)|(?:\\())/,\n    EXPRESSION_END: /[)\\w!]+$/,\n};\nexports.regularWithParam = {\n    getNumberBetweenRegWithSymbol: (symbol) => new RegExp(`${NUMBER_REG_STRING}[\\\\${symbol}]${NUMBER_REG_STRING}`),\n    getFunctionRegWithParam: (func) => new RegExp(`${func}${NUMBER_REG_STRING}`),\n    getNumbersLeftToSymbolReg: (symbol) => new RegExp(`${NUMBER_REG_STRING}${symbol}`),\n    getConstantReg: (constantName) => new RegExp(`(?<![A-Za-z0-9])${constantName}`)\n};\n\n\n//# sourceURL=webpack://webpack-server-config/./src/modules/calculator/services/helpers/regex.ts?");

/***/ }),

/***/ "./src/modules/calculator/services/helpers/text-formatting/formatExpression.ts":
/*!*************************************************************************************!*\
  !*** ./src/modules/calculator/services/helpers/text-formatting/formatExpression.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.formatExpression = void 0;\nconst formatText_1 = __webpack_require__(/*! ./formatText */ \"./src/modules/calculator/services/helpers/text-formatting/formatText.ts\");\nconst removeSpaces_1 = __webpack_require__(/*! ./removeSpaces */ \"./src/modules/calculator/services/helpers/text-formatting/removeSpaces.ts\");\nfunction formatExpression(expression) {\n    const formattedExpression = (0, formatText_1.formatText)(expression, {\n        removeSpaces: removeSpaces_1.removeSpaces,\n    });\n    return formattedExpression;\n}\nexports.formatExpression = formatExpression;\n\n\n//# sourceURL=webpack://webpack-server-config/./src/modules/calculator/services/helpers/text-formatting/formatExpression.ts?");

/***/ }),

/***/ "./src/modules/calculator/services/helpers/text-formatting/formatText.ts":
/*!*******************************************************************************!*\
  !*** ./src/modules/calculator/services/helpers/text-formatting/formatText.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.formatText = void 0;\nfunction formatText(text, formattedFunctions) {\n    const functionsNames = Object.keys(formattedFunctions);\n    const formattedText = functionsNames.reduce((formattedString, functionName) => {\n        const currentFormatFunction = formattedFunctions[functionName];\n        return currentFormatFunction(formattedString);\n    }, text);\n    return formattedText;\n}\nexports.formatText = formatText;\n\n\n//# sourceURL=webpack://webpack-server-config/./src/modules/calculator/services/helpers/text-formatting/formatText.ts?");

/***/ }),

/***/ "./src/modules/calculator/services/helpers/text-formatting/removeSpaces.ts":
/*!*********************************************************************************!*\
  !*** ./src/modules/calculator/services/helpers/text-formatting/removeSpaces.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.removeSpaces = void 0;\nfunction removeSpaces(str) {\n    return str.replace(/\\s/g, '');\n}\nexports.removeSpaces = removeSpaces;\n\n\n//# sourceURL=webpack://webpack-server-config/./src/modules/calculator/services/helpers/text-formatting/removeSpaces.ts?");

/***/ }),

/***/ "./src/modules/calculator/services/math/factorial.ts":
/*!***********************************************************!*\
  !*** ./src/modules/calculator/services/math/factorial.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.factorial = void 0;\nfunction factorial(n) {\n    if (n == 0 || n == 1) {\n        return 1;\n    }\n    if (n < 0 || !Number.isInteger(n)) {\n        throw new Error('Incorrect number to calculate');\n    }\n    return n * factorial(n - 1);\n}\nexports.factorial = factorial;\n\n\n//# sourceURL=webpack://webpack-server-config/./src/modules/calculator/services/math/factorial.ts?");

/***/ }),

/***/ "./src/modules/common/configs/logger-config.ts":
/*!*****************************************************!*\
  !*** ./src/modules/common/configs/logger-config.ts ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.getLoggerConfig = void 0;\nconst winston_1 = __importDefault(__webpack_require__(/*! winston */ \"winston\"));\nfunction getLoggerConfig(filename) {\n    return {\n        transports: [\n            new winston_1.default.transports.File({\n                filename: `./logs/${filename}.log`,\n                level: 'info'\n            }),\n        ],\n        format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.printf(info => {\n            const { timestamp, level, message, meta } = info;\n            if (level === 'info') {\n                return `[${timestamp}] ${level}: ${message}`;\n            }\n            return `[${timestamp}] ${level}: ${message} ${meta ? JSON.stringify(meta) : ''}`;\n        }))\n    };\n}\nexports.getLoggerConfig = getLoggerConfig;\n\n\n//# sourceURL=webpack://webpack-server-config/./src/modules/common/configs/logger-config.ts?");

/***/ }),

/***/ "./src/modules/common/controllers/client-log-controller.ts":
/*!*****************************************************************!*\
  !*** ./src/modules/common/controllers/client-log-controller.ts ***!
  \*****************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.clientLogController = void 0;\nconst express_validator_1 = __webpack_require__(/*! express-validator */ \"express-validator\");\nconst winston_1 = __importDefault(__webpack_require__(/*! winston */ \"winston\"));\nconst requestValidator_1 = __webpack_require__(/*! @utils/requestValidator */ \"./src/utils/requestValidator.ts\");\nconst responseHandler_1 = __webpack_require__(/*! @utils/decorators/responseHandler */ \"./src/utils/decorators/responseHandler.ts\");\nconst ErrorFactory_1 = __webpack_require__(/*! @utils/AppErrors/ErrorFactory */ \"./src/utils/AppErrors/ErrorFactory.ts\");\nconst logger_config_1 = __webpack_require__(/*! ../configs/logger-config */ \"./src/modules/common/configs/logger-config.ts\");\nconst clientLogger = winston_1.default.createLogger({\n    ...(0, logger_config_1.getLoggerConfig)('client'),\n    format: winston_1.default.format.printf(({ message }) => {\n        return `${message}`;\n    })\n});\nclass ClientLogController {\n    constructor() {\n        this.validateClientLogRequest = (0, requestValidator_1.requestValidator)([\n            (0, express_validator_1.body)('message')\n                .notEmpty()\n                .withMessage(ErrorFactory_1.ErrorFactory.MissingParameterError('message', 'body'))\n        ]);\n    }\n    saveLog(req, res) {\n        const { message } = (0, express_validator_1.matchedData)(req);\n        clientLogger.info(message);\n        return 'Log is success';\n    }\n}\n__decorate([\n    responseHandler_1.responseHandler\n], ClientLogController.prototype, \"saveLog\", null);\nexports.clientLogController = new ClientLogController();\n\n\n//# sourceURL=webpack://webpack-server-config/./src/modules/common/controllers/client-log-controller.ts?");

/***/ }),

/***/ "./src/modules/common/index.ts":
/*!*************************************!*\
  !*** ./src/modules/common/index.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.commonModule = void 0;\nconst common_router_1 = __webpack_require__(/*! ./routers/common-router */ \"./src/modules/common/routers/common-router.ts\");\nexports.commonModule = {\n    router: common_router_1.commonRouter,\n};\n\n\n//# sourceURL=webpack://webpack-server-config/./src/modules/common/index.ts?");

/***/ }),

/***/ "./src/modules/common/logger/index.ts":
/*!********************************************!*\
  !*** ./src/modules/common/logger/index.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.logger = void 0;\nconst winston_1 = __importDefault(__webpack_require__(/*! winston */ \"winston\"));\nconst logger_config_1 = __webpack_require__(/*! ../configs/logger-config */ \"./src/modules/common/configs/logger-config.ts\");\nexports.logger = winston_1.default.createLogger((0, logger_config_1.getLoggerConfig)('server'));\n\n\n//# sourceURL=webpack://webpack-server-config/./src/modules/common/logger/index.ts?");

/***/ }),

/***/ "./src/modules/common/routers/common-router.ts":
/*!*****************************************************!*\
  !*** ./src/modules/common/routers/common-router.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.commonRouter = void 0;\nconst express_1 = __webpack_require__(/*! express */ \"express\");\nconst client_log_controller_1 = __webpack_require__(/*! ../controllers/client-log-controller */ \"./src/modules/common/controllers/client-log-controller.ts\");\nconst commonRouter = (0, express_1.Router)();\nexports.commonRouter = commonRouter;\ncommonRouter.post('/log', client_log_controller_1.clientLogController.validateClientLogRequest, client_log_controller_1.clientLogController.saveLog);\n\n\n//# sourceURL=webpack://webpack-server-config/./src/modules/common/routers/common-router.ts?");

/***/ }),

/***/ "./src/modules/database/Services/Connection.ts":
/*!*****************************************************!*\
  !*** ./src/modules/database/Services/Connection.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Connection = void 0;\nconst pg_1 = __webpack_require__(/*! pg */ \"pg\");\nconst logger_1 = __webpack_require__(/*! @modules/common/logger */ \"./src/modules/common/logger/index.ts\");\nconst AppError_1 = __webpack_require__(/*! @utils/AppErrors/AppError */ \"./src/utils/AppErrors/AppError.ts\");\nclass Connection {\n    constructor(connectionParams) {\n        try {\n            this.pool = new pg_1.Pool(connectionParams);\n        }\n        catch (err) {\n            logger_1.logger.error('Failed connection to database', err);\n            console.log(err);\n            throw AppError_1.AppError.getErrorFrom(err);\n        }\n    }\n}\nexports.Connection = Connection;\n\n\n//# sourceURL=webpack://webpack-server-config/./src/modules/database/Services/Connection.ts?");

/***/ }),

/***/ "./src/modules/database/Services/SQLDatabase.ts":
/*!******************************************************!*\
  !*** ./src/modules/database/Services/SQLDatabase.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.SQLDatabase = void 0;\nconst AppError_1 = __webpack_require__(/*! @utils/AppErrors/AppError */ \"./src/utils/AppErrors/AppError.ts\");\nconst logger_1 = __webpack_require__(/*! @modules/common/logger */ \"./src/modules/common/logger/index.ts\");\nclass SQLDatabase {\n    constructor(connection) {\n        this.connection = connection;\n    }\n    async query(queryString, values) {\n        try {\n            const res = await this.connection.pool.query(queryString, values);\n            return res.rows;\n        }\n        catch (err) {\n            console.log(err);\n            logger_1.logger.error('Failed query to database', err);\n            throw AppError_1.AppError.getErrorFrom(err);\n        }\n    }\n    async createTable(tableName, model) {\n        const id = { name: 'id', type: 'SERIAL', constraints: ['PRIMARY KEY '] };\n        const created = { name: 'created_at', type: 'TIMESTAMP ', constraints: ['DEFAULT', 'CURRENT_TIMESTAMP'] };\n        const updated = { name: 'updated_at', type: 'TIMESTAMP ', constraints: ['DEFAULT', 'CURRENT_TIMESTAMP'] };\n        const fieldsWithId = [...model, id, created, updated];\n        const fieldsQuery = fieldsWithId.map(field => this.getFieldQuery(field)).join(', ');\n        const query = `CREATE TABLE IF NOT EXISTS \"${tableName}\" (${fieldsQuery});`;\n        await this.query(query);\n    }\n    getFieldQuery(field) {\n        const constraintsQuery = field.constraints ? field.constraints.join(' ') : '';\n        return `\"${field.name}\" ${field.type} ${constraintsQuery}`;\n    }\n}\nexports.SQLDatabase = SQLDatabase;\n\n\n//# sourceURL=webpack://webpack-server-config/./src/modules/database/Services/SQLDatabase.ts?");

/***/ }),

/***/ "./src/modules/database/index.ts":
/*!***************************************!*\
  !*** ./src/modules/database/index.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.database = void 0;\nconst Connection_1 = __webpack_require__(/*! ./Services/Connection */ \"./src/modules/database/Services/Connection.ts\");\nconst SQLDatabase_1 = __webpack_require__(/*! ./Services/SQLDatabase */ \"./src/modules/database/Services/SQLDatabase.ts\");\nconst calculatorDatabaseConnection = new Connection_1.Connection({\n    password: \"root\",\n    port: Number(\"5432\") || 5432,\n    user: \"admin\",\n    host: process.env.POSTGRES_HOST || 'localhost',\n});\nconst database = new SQLDatabase_1.SQLDatabase(calculatorDatabaseConnection);\nexports.database = database;\n\n\n//# sourceURL=webpack://webpack-server-config/./src/modules/database/index.ts?");

/***/ }),

/***/ "./src/modules/history/DAO/calculator-history-dao.ts":
/*!***********************************************************!*\
  !*** ./src/modules/history/DAO/calculator-history-dao.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.calculatorHistoryDAO = exports.CalculatorHistoryDAO = void 0;\nconst database_1 = __webpack_require__(/*! @modules/database */ \"./src/modules/database/index.ts\");\nconst calculation_history_1 = __webpack_require__(/*! ../models/calculation-history */ \"./src/modules/history/models/calculation-history.ts\");\nclass CalculatorHistoryDAO {\n    constructor() {\n        this.tableName = 'calculatorHistory';\n        database_1.database.createTable(this.tableName, calculation_history_1.calculatorHistoryModel);\n    }\n    async getHistory(limit) {\n        let query = `SELECT * from \"${this.tableName}\"`;\n        if (limit) {\n            query += ` ORDER BY id DESC LIMIT ${limit}`;\n        }\n        const history = (await database_1.database.query(query)).reverse();\n        return history;\n    }\n    async getLength() {\n        const query = `SELECT COUNT(*) AS row_count FROM \"${this.tableName}\"`;\n        return database_1.database.query(query);\n    }\n    async createHistoryItem(item) {\n        const query = `INSERT INTO \"${this.tableName}\" (expression, result, updated_at) VALUES ($1, $2, CURRENT_TIMESTAMP)`;\n        const values = [item.expression, item.result];\n        await database_1.database.query(query, values);\n    }\n    async getHistoryItem(expression) {\n        const query = `SELECT * FROM \"${this.tableName}\" WHERE expression = '${expression}'`;\n        return (await database_1.database.query(query))[0];\n    }\n    async deleteHistoryItem(condition) {\n        const query = `DELETE FROM \"${this.tableName}\" WHERE ${condition}`;\n        await database_1.database.query(query);\n    }\n}\nexports.CalculatorHistoryDAO = CalculatorHistoryDAO;\nconst calculatorHistoryDAO = new CalculatorHistoryDAO();\nexports.calculatorHistoryDAO = calculatorHistoryDAO;\n\n\n//# sourceURL=webpack://webpack-server-config/./src/modules/history/DAO/calculator-history-dao.ts?");

/***/ }),

/***/ "./src/modules/history/controllers/calculation-history-controller.ts":
/*!***************************************************************************!*\
  !*** ./src/modules/history/controllers/calculation-history-controller.ts ***!
  \***************************************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.calculationHistoryController = void 0;\nconst express_validator_1 = __webpack_require__(/*! express-validator */ \"express-validator\");\nconst responseHandler_1 = __webpack_require__(/*! @utils/decorators/responseHandler */ \"./src/utils/decorators/responseHandler.ts\");\nconst calculation_history_1 = __webpack_require__(/*! ../services/calculation-history */ \"./src/modules/history/services/calculation-history.ts\");\nclass CalculationHistoryController {\n    async getHistory(req) {\n        const data = (0, express_validator_1.matchedData)(req);\n        const limit = Number(data.limit);\n        const history = await calculation_history_1.calculatioNHistoryService.getHistory(limit);\n        const historyList = {\n            items: history,\n            total: await calculation_history_1.calculatioNHistoryService.getHistoryLength(),\n        };\n        return historyList;\n    }\n}\n__decorate([\n    responseHandler_1.responseHandler\n], CalculationHistoryController.prototype, \"getHistory\", null);\nexports.calculationHistoryController = new CalculationHistoryController();\n\n\n//# sourceURL=webpack://webpack-server-config/./src/modules/history/controllers/calculation-history-controller.ts?");

/***/ }),

/***/ "./src/modules/history/index.ts":
/*!**************************************!*\
  !*** ./src/modules/history/index.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.historyModule = void 0;\nconst history_router_1 = __webpack_require__(/*! ./routers/history-router */ \"./src/modules/history/routers/history-router.ts\");\nexports.historyModule = {\n    router: history_router_1.historyRouter,\n};\n\n\n//# sourceURL=webpack://webpack-server-config/./src/modules/history/index.ts?");

/***/ }),

/***/ "./src/modules/history/middlewares/history-validation-middleware.ts":
/*!**************************************************************************!*\
  !*** ./src/modules/history/middlewares/history-validation-middleware.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.historyValidation = void 0;\nconst ErrorFactory_1 = __webpack_require__(/*! @utils/AppErrors/ErrorFactory */ \"./src/utils/AppErrors/ErrorFactory.ts\");\nconst requestValidator_1 = __webpack_require__(/*! @utils/requestValidator */ \"./src/utils/requestValidator.ts\");\nconst express_validator_1 = __webpack_require__(/*! express-validator */ \"express-validator\");\nconst limitError = ErrorFactory_1.ErrorFactory.IncorrectParameter('The \"limit\" parameter must take integer values ​​from 1 to 20');\nexports.historyValidation = (0, requestValidator_1.requestValidator)([\n    (0, express_validator_1.query)('limit')\n        .optional()\n        .isNumeric()\n        .withMessage(limitError)\n        .isInt({ min: 1, max: 20 })\n        .withMessage(limitError)\n        .default(5)\n]);\n\n\n//# sourceURL=webpack://webpack-server-config/./src/modules/history/middlewares/history-validation-middleware.ts?");

/***/ }),

/***/ "./src/modules/history/models/calculation-history.ts":
/*!***********************************************************!*\
  !*** ./src/modules/history/models/calculation-history.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.calculatorHistoryModel = void 0;\nexports.calculatorHistoryModel = [\n    { name: 'expression', type: 'TEXT', constraints: ['NOT NULL'] },\n    { name: 'result', type: 'FLOAT', constraints: ['NOT NULL'] }\n];\n\n\n//# sourceURL=webpack://webpack-server-config/./src/modules/history/models/calculation-history.ts?");

/***/ }),

/***/ "./src/modules/history/routers/history-router.ts":
/*!*******************************************************!*\
  !*** ./src/modules/history/routers/history-router.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.historyRouter = void 0;\nconst express_1 = __webpack_require__(/*! express */ \"express\");\nconst calculation_history_controller_1 = __webpack_require__(/*! ../controllers/calculation-history-controller */ \"./src/modules/history/controllers/calculation-history-controller.ts\");\nconst history_validation_middleware_1 = __webpack_require__(/*! ../middlewares/history-validation-middleware */ \"./src/modules/history/middlewares/history-validation-middleware.ts\");\nconst historyRouter = (0, express_1.Router)();\nexports.historyRouter = historyRouter;\nhistoryRouter.get('/history/calculation', history_validation_middleware_1.historyValidation, calculation_history_controller_1.calculationHistoryController.getHistory);\n\n\n//# sourceURL=webpack://webpack-server-config/./src/modules/history/routers/history-router.ts?");

/***/ }),

/***/ "./src/modules/history/services/calculation-history.ts":
/*!*************************************************************!*\
  !*** ./src/modules/history/services/calculation-history.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.calculatioNHistoryService = exports.CalculatioNHistoryService = void 0;\nconst logger_1 = __webpack_require__(/*! @modules/common/logger */ \"./src/modules/common/logger/index.ts\");\nconst calculator_history_dao_1 = __webpack_require__(/*! ../DAO/calculator-history-dao */ \"./src/modules/history/DAO/calculator-history-dao.ts\");\nclass CalculatioNHistoryService {\n    constructor() {\n        this.maxHistoryLength = Number(\"20\");\n    }\n    async getHistory(limit = 5) {\n        try {\n            logger_1.logger.info(`Getting history with limit: ${limit}`);\n            return calculator_history_dao_1.calculatorHistoryDAO.getHistory(limit);\n        }\n        catch (error) {\n            logger_1.logger.error(`Error while getting history with limit ${limit} at HistoryService`, error);\n            throw error;\n        }\n    }\n    async addHistoryItem(data) {\n        try {\n            await calculator_history_dao_1.calculatorHistoryDAO.createHistoryItem(data);\n            const historyLength = await this.getHistoryLength();\n            if (historyLength > this.maxHistoryLength) {\n                calculator_history_dao_1.calculatorHistoryDAO.deleteHistoryItem('created_at = (SELECT MIN(created_at) FROM calculatorHistory)');\n            }\n        }\n        catch (error) {\n            logger_1.logger.error(`Error while setting new item ${data} at HistoryService`, error);\n            throw error;\n        }\n    }\n    async getHistoryLength() {\n        try {\n            return calculator_history_dao_1.calculatorHistoryDAO.getLength();\n        }\n        catch (error) {\n            logger_1.logger.error(`Failed get history length at HistoryService`, error);\n            throw error;\n        }\n    }\n}\nexports.CalculatioNHistoryService = CalculatioNHistoryService;\nexports.calculatioNHistoryService = new CalculatioNHistoryService();\n\n\n//# sourceURL=webpack://webpack-server-config/./src/modules/history/services/calculation-history.ts?");

/***/ }),

/***/ "./src/modules/index.ts":
/*!******************************!*\
  !*** ./src/modules/index.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.appRouter = void 0;\nconst express_1 = __webpack_require__(/*! express */ \"express\");\nconst calculator_1 = __webpack_require__(/*! ./calculator */ \"./src/modules/calculator/index.ts\");\nconst common_1 = __webpack_require__(/*! ./common */ \"./src/modules/common/index.ts\");\nconst history_1 = __webpack_require__(/*! ./history */ \"./src/modules/history/index.ts\");\nconst modules = [calculator_1.calculatorModule, common_1.commonModule, history_1.historyModule];\nconst appRouter = (0, express_1.Router)();\nexports.appRouter = appRouter;\nmodules.forEach(module => {\n    appRouter.use(`/api`, module.router);\n});\n\n\n//# sourceURL=webpack://webpack-server-config/./src/modules/index.ts?");

/***/ }),

/***/ "./src/utils/AppErrors/AppError.ts":
/*!*****************************************!*\
  !*** ./src/utils/AppErrors/AppError.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.AppError = void 0;\nconst error_type_1 = __webpack_require__(/*! ./error-type */ \"./src/utils/AppErrors/error-type.ts\");\nconst DEFAULT_MESSAGE = 'Unexpected error while execution';\nclass AppError {\n    constructor(params) {\n        this.status = params?.status || 500;\n        this.message = params?.message || DEFAULT_MESSAGE;\n        this.type = params?.type || error_type_1.ErrorType.ServerError;\n    }\n    static getErrorFrom(error) {\n        if (error instanceof AppError) {\n            return error;\n        }\n        return new AppError({\n            status: 500,\n            type: error_type_1.ErrorType.ServerError,\n        });\n    }\n}\nexports.AppError = AppError;\n\n\n//# sourceURL=webpack://webpack-server-config/./src/utils/AppErrors/AppError.ts?");

/***/ }),

/***/ "./src/utils/AppErrors/ErrorFactory.ts":
/*!*********************************************!*\
  !*** ./src/utils/AppErrors/ErrorFactory.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.ErrorFactory = void 0;\nconst AppError_1 = __webpack_require__(/*! ./AppError */ \"./src/utils/AppErrors/AppError.ts\");\nconst error_type_1 = __webpack_require__(/*! ./error-type */ \"./src/utils/AppErrors/error-type.ts\");\nexports.ErrorFactory = {\n    ServerError: () => {\n        return new AppError_1.AppError({ message: 'Internal server error', status: 500, type: error_type_1.ErrorType.ServerError });\n    },\n    BadRequestError: () => {\n        return new AppError_1.AppError({ message: 'Bad request', status: 400, type: error_type_1.ErrorType.BadRequestError });\n    },\n    MissingParameterError: (missingParam, missingParamType) => {\n        return new AppError_1.AppError({\n            message: `Missing required ${missingParamType} parameter: ${missingParam}`,\n            status: 400,\n            type: error_type_1.ErrorType.MissingParameter\n        });\n    },\n    IncorrectParameter: (message) => {\n        return new AppError_1.AppError({\n            message: message,\n            status: 400,\n            type: error_type_1.ErrorType.BadRequestError\n        });\n    },\n    CalculationError: (exceptionName, exceptionPlace) => {\n        return new AppError_1.AppError({\n            message: `Expression contains ${exceptionName} in ${exceptionPlace}`,\n            status: 422,\n            type: error_type_1.ErrorType.RuntimeError\n        });\n    }\n};\n\n\n//# sourceURL=webpack://webpack-server-config/./src/utils/AppErrors/ErrorFactory.ts?");

/***/ }),

/***/ "./src/utils/AppErrors/ExpressionValidationError.ts":
/*!**********************************************************!*\
  !*** ./src/utils/AppErrors/ExpressionValidationError.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.ExpressionValidationError = void 0;\nconst AppError_1 = __webpack_require__(/*! @utils/AppErrors/AppError */ \"./src/utils/AppErrors/AppError.ts\");\nconst error_type_1 = __webpack_require__(/*! @utils/AppErrors/error-type */ \"./src/utils/AppErrors/error-type.ts\");\nclass ExpressionValidationError extends AppError_1.AppError {\n    constructor(failedValidations) {\n        super({\n            message: 'Expression has incorrect format',\n            type: error_type_1.ErrorType.ValidationError,\n            status: 400\n        });\n        this.failedValidations = failedValidations;\n    }\n}\nexports.ExpressionValidationError = ExpressionValidationError;\n\n\n//# sourceURL=webpack://webpack-server-config/./src/utils/AppErrors/ExpressionValidationError.ts?");

/***/ }),

/***/ "./src/utils/AppErrors/error-type.ts":
/*!*******************************************!*\
  !*** ./src/utils/AppErrors/error-type.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.ErrorType = void 0;\nvar ErrorType;\n(function (ErrorType) {\n    ErrorType[\"ValidationError\"] = \"validationError\";\n    ErrorType[\"RuntimeError\"] = \"runtimeError\";\n    ErrorType[\"ServerError\"] = \"unexpectedServerError\";\n    ErrorType[\"MissingParameter\"] = \"missingParameterError\";\n    ErrorType[\"BadRequestError\"] = \"badRequestError\";\n})(ErrorType = exports.ErrorType || (exports.ErrorType = {}));\n\n\n//# sourceURL=webpack://webpack-server-config/./src/utils/AppErrors/error-type.ts?");

/***/ }),

/***/ "./src/utils/ResponseFormatter.ts":
/*!****************************************!*\
  !*** ./src/utils/ResponseFormatter.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.ResponseFormatter = void 0;\nclass ResponseFormatter {\n    constructor(params) {\n        this.success = params.data ? true : false;\n        this.status = params.status || params.error?.status || (params.data ? 200 : 500);\n        this.data = params.data || null;\n        this.error = params.error || null;\n    }\n    json() {\n        return JSON.stringify(this);\n    }\n}\nexports.ResponseFormatter = ResponseFormatter;\n\n\n//# sourceURL=webpack://webpack-server-config/./src/utils/ResponseFormatter.ts?");

/***/ }),

/***/ "./src/utils/decorators/responseHandler.ts":
/*!*************************************************!*\
  !*** ./src/utils/decorators/responseHandler.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.responseHandler = void 0;\nconst AppError_1 = __webpack_require__(/*! @utils/AppErrors/AppError */ \"./src/utils/AppErrors/AppError.ts\");\nconst ResponseFormatter_1 = __webpack_require__(/*! @utils/ResponseFormatter */ \"./src/utils/ResponseFormatter.ts\");\n/**\n *\n * @param target\n * @param key\n * @param descriptor\n *\n * @description a decorator for controller methods that sends the value to the client that the function we are decorating will return. Also, in case of an error, it will be caught and called errorHandler middleware.\n */\nfunction responseHandler(target, key, descriptor) {\n    const originalMethod = descriptor.value;\n    descriptor.value = async function (req, res, next) {\n        try {\n            const result = await originalMethod.call(this, req, res, next);\n            const responseFormat = new ResponseFormatter_1.ResponseFormatter({ data: result }).json();\n            res.send(responseFormat);\n        }\n        catch (err) {\n            const error = AppError_1.AppError.getErrorFrom(err);\n            const responseFormat = new ResponseFormatter_1.ResponseFormatter({ error }).json();\n            res.status(error.status).send(responseFormat);\n        }\n    };\n    return descriptor;\n}\nexports.responseHandler = responseHandler;\n\n\n//# sourceURL=webpack://webpack-server-config/./src/utils/decorators/responseHandler.ts?");

/***/ }),

/***/ "./src/utils/requestValidator.ts":
/*!***************************************!*\
  !*** ./src/utils/requestValidator.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.requestValidator = void 0;\nconst AppError_1 = __webpack_require__(/*! @utils/AppErrors/AppError */ \"./src/utils/AppErrors/AppError.ts\");\nconst ResponseFormatter_1 = __webpack_require__(/*! @utils/ResponseFormatter */ \"./src/utils/ResponseFormatter.ts\");\nconst express_validator_1 = __webpack_require__(/*! express-validator */ \"express-validator\");\nfunction requestValidator(validations) {\n    return async (req, res, next) => {\n        for (let validation of validations) {\n            const result = await validation.run(req);\n            if (!result.isEmpty())\n                break;\n        }\n        const errors = (0, express_validator_1.validationResult)(req);\n        if (errors.isEmpty()) {\n            return next();\n        }\n        const error = AppError_1.AppError.getErrorFrom(errors.array()[0].msg);\n        const JSONResponse = new ResponseFormatter_1.ResponseFormatter({\n            status: error.status,\n            error\n        }).json();\n        res.status(error.status).send(JSONResponse);\n    };\n}\nexports.requestValidator = requestValidator;\n;\n\n\n//# sourceURL=webpack://webpack-server-config/./src/utils/requestValidator.ts?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("body-parser");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "express-validator":
/*!************************************!*\
  !*** external "express-validator" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("express-validator");

/***/ }),

/***/ "express-winston":
/*!**********************************!*\
  !*** external "express-winston" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("express-winston");

/***/ }),

/***/ "pg":
/*!*********************!*\
  !*** external "pg" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("pg");

/***/ }),

/***/ "winston":
/*!**************************!*\
  !*** external "winston" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("winston");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.ts");
/******/ 	
/******/ })()
;
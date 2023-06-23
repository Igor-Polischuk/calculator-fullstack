import { Pool, PoolConfig } from "pg";
import { logger } from "@modules/common/logger";
import { ITableFields, Model } from "../Interfaces";
import { AppError } from "@utils/AppErrors/AppError";


export class Connection {
    readonly pool

    constructor(connectionParams: PoolConfig) {
        try {
            this.pool = new Pool(connectionParams)
        } catch (err) {
            logger.error('Failed connection to database', err)
            console.log(err);
            throw AppError.getErrorFrom(err)
        }
    }
}
import fs from 'fs'

import { IDBItem, IHistoryRepository } from "./IHistoryRepository";

export class JsonDB implements IHistoryRepository {
    private pathToFile

    constructor(pathToFile: string) {
        this.pathToFile = pathToFile

        if (!fs.existsSync(this.pathToFile)) {
            const initialData: never[] = [];
            fs.writeFileSync(this.pathToFile, JSON.stringify(initialData));
        }
    }

    async getAll(): Promise<IDBItem[]> {
        const contents = fs.readFileSync(this.pathToFile, 'utf8');
        const data: IDBItem[] = JSON.parse(contents);
        return data;
    }

    async getItem(expression: string): Promise<IDBItem | null> {
        const data = await this.getAll();
        const item = data.find((DBItem) => DBItem.expression === expression);
        return item || null;
    }

    async setItem(item: IDBItem): Promise<void> {
        const data = await this.getAll();
        const newData = [...data.slice(-4), item]
        fs.writeFileSync(this.pathToFile, JSON.stringify(newData));
    }
}
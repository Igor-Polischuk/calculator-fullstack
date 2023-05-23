import fs from 'fs'
import { DataTypeExtended, IDataBase, IGetItemParams } from './IDatabase';

export class JsonDB<DataType> implements IDataBase<DataType>{
    private pathToFile

    constructor(pathToFile: string, initialData?: DataTypeExtended<DataType>[]) {
        this.pathToFile = pathToFile

        if (!fs.existsSync(this.pathToFile)) {
            const data: DataType[] = initialData || [];
            fs.writeFileSync(this.pathToFile, JSON.stringify(data));
        }
    }

    async getLength(): Promise<number> {
        return (await this.getAll()).length
    }

    async getAll(): Promise<DataTypeExtended<DataType>[]> {
        const contents = fs.readFileSync(this.pathToFile, 'utf8');
        const data: DataTypeExtended<DataType>[] = JSON.parse(contents);
        return data;
    }

    async count(count: number): Promise<DataTypeExtended<DataType>[]> {
        const data = await this.getAll()
        return data.slice(-count)
    }

    async deleteItem(params: IGetItemParams<DataTypeExtended<DataType>>): Promise<void> {
        const data = this.getAll()
        const newData = (await data).filter(DBItem => DBItem[params.field] !== params.value)
        fs.writeFileSync(this.pathToFile, JSON.stringify(newData));
    }

    async pop(): Promise<void> {
        const data = await this.getAll()
        const newData = data.slice(1).map(item => {
            const newId = item.id - 1
            return { ...item, id: newId }
        })
        fs.writeFileSync(this.pathToFile, JSON.stringify(newData));
    }

    async getItem(params: IGetItemParams<DataTypeExtended<DataType>>): Promise<DataType | null> {
        const data = await this.getAll();
        const item = data.find(DBItem => DBItem[params.field] === params.value)
        return item || null;
    }

    async setItem(item: DataType): Promise<void> {
        const data = await this.getAll();
        const newItem = { ...item, id: data.length }
        const newData = [...data, newItem]
        fs.writeFileSync(this.pathToFile, JSON.stringify(newData));
    }
}
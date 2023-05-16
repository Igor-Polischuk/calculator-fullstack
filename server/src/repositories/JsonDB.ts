import fs from 'fs'

interface IBaseFields {
    id: number
}

interface IGetItemParams<DataType> {
    field: keyof DataType
    value: unknown
}

type DataTypeExtended<DataType> = DataType & IBaseFields;

export class JsonDB<DataType> {
    private pathToFile
    private size

    constructor(pathToFile: string, initialData?: DataTypeExtended<DataType>[]) {
        this.pathToFile = pathToFile
        this.size = initialData?.length || 0

        if (!fs.existsSync(this.pathToFile)) {
            const data: DataType[] = initialData || [];
            fs.writeFileSync(this.pathToFile, JSON.stringify(data));
        }
    }

    get DBsize() {
        return this.size
    }

    async getAll(): Promise<DataTypeExtended<DataType>[]> {
        const contents = fs.readFileSync(this.pathToFile, 'utf8');
        const data: DataTypeExtended<DataType>[] = JSON.parse(contents);
        this.size = data.length
        return data;
    }

    async count(count: number): Promise<DataType[]> {
        const data = await this.getAll()
        return data.slice(-count)
    }

    async deleteItem(params: IGetItemParams<DataTypeExtended<DataType>>): Promise<void> {
        const data = this.getAll()
        const newData = (await data).filter(DBItem => DBItem[params.field] !== params.value)
        this.size = newData.length
        fs.writeFileSync(this.pathToFile, JSON.stringify(newData));
    }

    async pop(): Promise<void> {
        const data = await this.getAll()
        const newData = data.slice(1).map(item => {
            const newId = item.id - 1
            return { ...item, id: newId }
        })
        this.size = newData.length
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
        this.size = newData.length
        fs.writeFileSync(this.pathToFile, JSON.stringify(newData));
    }
}
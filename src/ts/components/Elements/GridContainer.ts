import { DivElement } from './DivElement';

interface IGridContainerConfig {
    classNames?: string
    rows?: number,
    columns?: number
    columnsWidth?: number
    rowsHeight?: number
    gap?: number
}

export class GridContainer extends DivElement {
    private columns: number | undefined;
    private rows: number | undefined;
    private columnsWidth: number | undefined;
    private rowsHeight: number | undefined;
    private gap: number | undefined;
    constructor(config: IGridContainerConfig) {
        super(config)
        this.rows = config.rows
        this.columns = config.columns
        this.columnsWidth = config.columnsWidth
        this.rowsHeight = config.rowsHeight
        this.gap = config.gap

        this.createGrid()
    }

    private createGrid() {
        const gridBlock = this.domElement
        gridBlock.style.display = 'grid'
        gridBlock.style.gridTemplateColumns = `repeat(${this.columns}, ${this.columnsWidth || 'auto'})`
        gridBlock.style.gridTemplateRows = `repeat(${this.rows}, ${this.rowsHeight || 'auto'})`
        gridBlock.style.gridAutoRows = 'auto'
        gridBlock.style.gridAutoColumns = 'auto'
        gridBlock.style.gap = (this.gap ? this.gap : 0) + 'px'
    }
} 